module Pipe
  class InventoryUpdate
    Result = Struct.new(:success?, :errors, keyword_init: true)

    def self.call(store:, model:, inventory:)
      new(store: store, model: model, inventory: inventory).call
    end

    def initialize(store:, model:, inventory:)
      @store_name = store
      @model = model
      @inventory = inventory
    end

    def call
      shoe = Shoe.joins(:store).find_by(name: @model, store: { name: @store_name })

      unless shoe
        return Result.new(success?: false, errors: ["Inventory entry not found"])
      end

      if shoe.update(inventory: @inventory)
        ActionCable.server.broadcast "PipeChannel", { store: @store_name, name: @model, inventory: @inventory }
        Result.new(success?: true, errors: [])
      else
        Result.new(success?: false, errors: shoe.errors.full_messages)
      end
    end
  end
end
