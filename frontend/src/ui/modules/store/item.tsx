import { useEffect, useState, useRef } from "react"
import { GiConverseShoe } from "react-icons/gi"
import { useAppSelector } from "@/app/redux/hooks"
import { IShoe } from "@/pages/dashboard/redux/reducer"
import { get_store } from "@/pages/dashboard/redux/selectors"
import { useNavigation } from "react-router-dom"
import { RxDragHandleDots2 } from "react-icons/rx"
import { useDrag, useDrop } from "react-dnd"
import TransferModal from "@/ui/modules/modal"

const StoreItem: React.FC<Omit<IShoe & { store: string }, "id">> = ({ store, name, inventory }) => {

  const ref = useRef(null)
  const navigation = useNavigation();
  const shoe = useAppSelector(state => get_store(state, [store, name]))
  
  const [css, setCSS] = useState('')
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false)

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
    if (navigation.state === "idle" && shoe.name === name) {

      let color = shoe.inventory >= 75
        ? 'flicker-green'
        : shoe.inventory >= 50 && shoe.inventory < 75
        ? 'flicker-blue'
        : shoe.inventory >= 25 && shoe.inventory < 50
        ? 'flicker-yellow'
        : 'flicker-red'

      setCSS(color)

      setTimeout(() => {
        setCSS('')
      }, 1000)
    }
  }, [navigation, shoe])

  const [ { isDragging }, dragRef ] = useDrag({
    type: "SHOE",
    item: { store: store, shoe: name, inventory: shoe.inventory },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [ { isOver }, dropRef ] = useDrop({
    accept: "SHOE",
    collect: monitor => ({
      isOver: monitor.isOver()
    }),
    drop: (item: any) => {
      if (item.store !== store && item.shoe === shoe.name) {
        setData({ from: item.store, to: store, shoe: shoe.name, amount: item.inventory })
        setShowModal(true);
      }
    }
  })

  dragRef(dropRef(ref))

  return (
    <>
      <div ref={ref} className={`${css} ${isDragging || isOver ? "ring-1 ring-gray-400" : ""} flex justify-between items-center bg-gray-50 rounded p-3 divide-x-2 transition-all duration-200`}>
        <div className="flex divide-x-2 space-x-2">
          <GiConverseShoe />
          <p className="text-sm font-medium text-gray-500 pl-2">{name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-500 pl-2">Inventory:</p>
          <div className={`flex text-sm font-medium min-w-[30px] ${handleColorInventory(shoe.inventory)} justify-center rounded`}>
            <p>{shoe.inventory}</p>
          </div>
          <button className="text-sm bg-gray-300 p-1 rounded text-gray-600 ml-2 hover:bg-black hover:text-white transition-all duration-300">
            <RxDragHandleDots2 />
          </button>
          <div className="flex bg-red-300 "></div>
        </div>
      </div>
      <TransferModal data={data} open={showModal} trigger={setShowModal} />
    </>
  )
}

export default StoreItem