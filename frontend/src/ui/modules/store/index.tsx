import { useState } from "react";
import { IStore } from "@/pages/dashboard/redux/reducer";
import StoreItem from "@/ui/modules/store/item";

const Store: React.FC<Omit<IStore, "id">> = ({ name, shoes }) => {

  const [data, setData] = useState<Omit<IStore, "id">>({
    name: name,
    shoes: shoes,
  })

  return (
    <div className="flex flex-col rounded-lg bg-gray-100 p-4">
      <h3 className="text-lg font-semibold">{data.name}</h3>
      <h4 className="text-sm text-gray-400">Inventory</h4>
      <hr className="my-4"/>
      <div className="flex flex-col space-y-4">
        { shoes.map((shoe) => {
          return (
            <StoreItem key={shoe.id} store={data.name} name={shoe.name} inventory={shoe.inventory} />
          )
        }) }
      </div>
    </div>
  )
}

export default Store;