module Mutations
  class ShoesMutation < BaseMutation
    field :transfered, type: Types::ShoeType, null: false do
      description "Transfer inventory from one store to another"
    end

    argument :from, String, required: true do
      description "Store which is sending the shoes"
    end

    argument :to, String, required: true do
      description "Store that is receinving the shoes"
    end

    argument :amount, Integer, required: true do
      description "Amount to be transacted"
    end

    argument :shoe, String, required: true do
      description "Shoe name"
    end

    def resolve(from:, to:, amount:, shoe:)
      @from = Shoe.where(name: shoe).joins(:store).where(store: { name: from })[0]
      @from.update({ inventory: @from.inventory - amount })

      @to = Shoe.where(name: shoe).joins(:store).where(store: { name: to })[0]

      if @to.update({ inventory: @to.inventory + amount })
        return {
          transfered: @to,
          errors: []
        } 
      else
        return {
          transfer: nil,
          errors: [@to.errors.full_messages, @from.errors.full_messages]
        }
      end
    end
  end
end