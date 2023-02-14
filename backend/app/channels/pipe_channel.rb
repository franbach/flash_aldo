require 'websocket-client-simple'

class PipeChannel < ApplicationCable::Channel

  @ws = WebSocket::Client::Simple.connect 'ws://localhost:8080/'
  
  @ws.on :message do |msg|
    data = JSON.parse(msg.data)

    inventory = Shoe.where(name: data['model']).joins(:store).where(store: {name: data['store']})
    inventory.update({inventory: data['inventory']})

    ActionCable.server.broadcast 'PipeChannel', { store: data['store'], name: data['model'], inventory: data['inventory'] }
  end
  
  @ws.on :open do
    @ws.send 'Connected to the broadcaster!'
  end
  
  @ws.on :close do |e|
    p e
    exit 1
  end
  
  @ws.on :error do |e|
    p e
  end

  def subscribed
    stream_from "PipeChannel"
  end

  def unsubscribed
    stop_all_streams
  end

  # def received(data)
  # end

end
