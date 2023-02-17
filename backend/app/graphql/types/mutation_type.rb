module Types
  class MutationType < Types::BaseObject
    field :transfer, mutation: Mutations::ShoesMutation
  end
end
