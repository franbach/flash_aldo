import { useEffect, useState } from "react"
import { GiConverseShoe } from "react-icons/gi"
import { useAppSelector } from "@/app/redux/hooks"
import { IShoe } from "@/pages/dashboard/redux/reducer"
import { get_store } from "@/pages/dashboard/redux/selectors"
import { useNavigation } from "react-router-dom"

const StoreItem: React.FC<Omit<IShoe & { store: string }, "id">> = ({ store, name, inventory }) => {

  const [css, setCSS] = useState('')
  const navigation = useNavigation();

  const item = useAppSelector(state => get_store(state, [store, name]))

  const handleColorInventory = (amount: number) => {

    let color = "bg-blue-300 text-blue-600"

    switch(true) {
      case amount >= 75:
        color = "bg-green-300 text-green-600"
        break;
      case amount >= 50 && amount < 75:
        break;
      case amount >= 25 && amount < 50:
        color = "bg-yellow-300 text-yellow-600"
        break;
      case amount >= 0 && amount < 25:
        color = "bg-red-300 text-red-600"
        break;
      default:
        break
    }

    return color;
  }

  useEffect(() => {
    if (navigation.state === "idle" && item.name === name) {

      let color = item.inventory >= 75
        ? 'flicker-green'
        : item.inventory >= 50 && item.inventory < 75
        ? 'flicker-blue'
        : item.inventory >= 25 && item.inventory < 50
        ? 'flicker-yellow'
        : 'flicker-red'

      setCSS(color)

      setTimeout(() => {
        setCSS('')
      }, 1000)
    }
  }, [navigation, item])

  return (
    <div className={`${css} flex justify-between items-center bg-gray-50 rounded p-3 divide-x-2 transition-all duration-200`}>
      <div className="flex divide-x-2 space-x-2">
        <GiConverseShoe />
        <p className="text-sm font-medium text-gray-500 pl-2">{name}</p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium text-gray-500 pl-2">Inventory:</p>
        <div className={`flex text-sm font-medium min-w-[30px] ${handleColorInventory(item.inventory)} justify-center rounded`}>
          <p>{item.inventory}</p>
        </div>
        <button className="text-sm bg-gray-300 px-2 rounded text-gray-600 ml-2 hover:bg-black hover:text-white transition-all duration-300">
          <p>send to</p>
        </button>
        <div className="flex bg-red-300 "></div>
      </div>
    </div>
  )
}

export default StoreItem