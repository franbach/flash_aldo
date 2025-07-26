module Shoes
  class Transfer
    Result = Struct.new(:shoe, :errors, keyword_init: true)

    def self.call(from:, to:, amount:, shoe:)
      new(from: from, to: to, amount: amount, shoe: shoe).call
    end

    def initialize(from:, to:, amount:, shoe:)
      @from_store_name = from
      @to_store_name = to
      @amount = amount
      @shoe_name = shoe
    end

    def call
      errors = []
      transferred = nil

      ActiveRecord::Base.transaction do
        from_inventory = Shoe.joins(:store).find_by(name: @shoe_name, store: { name: @from_store_name })
        to_inventory = Shoe.joins(:store).find_by(name: @shoe_name, store: { name: @to_store_name })

        unless from_inventory && to_inventory
          errors << "Inventory entry not found"
          raise ActiveRecord::Rollback
        end

        from_inventory.update(inventory: from_inventory.inventory - @amount)
        to_inventory.update(inventory: to_inventory.inventory + @amount)

        transferred = to_inventory if errors.empty? && to_inventory.errors.empty? && from_inventory.errors.empty?
        errors.concat(from_inventory.errors.full_messages) if from_inventory.errors.any?
        errors.concat(to_inventory.errors.full_messages) if to_inventory.errors.any?

        raise ActiveRecord::Rollback if errors.any?
      end

      Result.new(shoe: transferred, errors: errors)
    end
  end
end
