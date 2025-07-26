module Mutations
  class ShoesMutation < BaseMutation
    field :transfered, type: Types::ShoeType, null: true do
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
      result = Shoes::Transfer.call(from: from, to: to, amount: amount, shoe: shoe)

      if result.shoe
        {
          transfered: result.shoe,
          errors: []
        }
      else
        {
          transfered: nil,
          errors: result.errors
        }
      end
    end
  end
end