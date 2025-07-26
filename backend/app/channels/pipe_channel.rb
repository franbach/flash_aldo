class PipeChannel < ApplicationCable::Channel
  def subscribed
    Pipe::Listener.start!
    stream_from "PipeChannel"
  end

  def unsubscribed
    stop_all_streams
  end

end
