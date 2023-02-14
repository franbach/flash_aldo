import { useState } from "react";

import { GiConverseShoe } from "react-icons/gi"

interface FCProps {
  _data: {
    store: string;
    shoe: string;
    inventory: number;
  }
}

const Store: React.FC<FCProps> = ({ _data }) => {

  const [data, setData] = useState<FCProps['_data']>({
    store: _data.store,
    shoe: _data.shoe,
    inventory: _data.inventory 
  })

  return (
    <div className="flex flex-col rounded-lg bg-gray-100 p-4 w-1/3">
      <h3 className="text-lg font-semibold">{data.store}</h3>
      <h4 className="text-sm text-gray-400">Inventory</h4>
      <hr className="my-4"/>

      <div className="flex justify-between items-center bg-gray-50 rounded p-3 divide-x-2">
        <div className="flex divide-x-2 space-x-2">
          <GiConverseShoe />
          <p className="text-sm font-medium text-gray-500 pl-2">{data.shoe}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-500 pl-2">Inventory:</p>
          <div className="flex text-sm font-medium min-w-[30px] bg-green-500 justify-center rounded">
            <p>{data.inventory}</p>
          </div>
          <button className="text-sm bg-gray-300 px-2 rounded text-gray-600 ml-2 hover:bg-black hover:text-white transition-all duration-300">
            <p>send to</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Store;