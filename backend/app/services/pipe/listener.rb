require "websocket-client-simple"

module Pipe
  class Listener
    DEFAULT_URL = "ws://localhost:8080/".freeze

    def self.start!(url: DEFAULT_URL)
      instance.start!(url: url)
    end

    def self.instance
      @instance ||= new
    end

    def initialize
      @mutex = Mutex.new
      @started = false
      @ws = nil
    end

    def start!(url: DEFAULT_URL)
      @mutex.synchronize do
        return if @started

        listener = self

        @ws = WebSocket::Client::Simple.connect(url)

        @ws.on :message do |msg|
          listener.send(:handle_message, msg)
        rescue StandardError => e
          Rails.logger.error("Pipe::Listener message error: #{e.class}: #{e.message}")
        end

        @ws.on :open do
          @ws.send "Connected to the broadcaster!"
        rescue StandardError => e
          Rails.logger.error("Pipe::Listener open error: #{e.class}: #{e.message}")
        end

        @ws.on :close do |e|
          Rails.logger.error("Pipe::Listener closed: #{e.inspect}")
        end

        @ws.on :error do |e|
          Rails.logger.error("Pipe::Listener error: #{e.inspect}")
        end

        @started = true
      end
    end

    private

    def handle_message(msg)
      data = JSON.parse(msg.data)
      Pipe::InventoryUpdate.call(store: data["store"], model: data["model"], inventory: data["inventory"])
    end
  end
end
