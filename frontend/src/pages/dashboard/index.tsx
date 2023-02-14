import { useEffect } from "react"
import { action } from "@/app/helpers"

import Store from "@/ui/modules/store"

const Dashboard: React.FC = () => {

  useEffect(() => {
    action.cable!.subscriptions.create(
      {
        channel: 'PipeChannel',
      },
      {
        connected: () => {
          console.log("Connected to pipe channel!")
        },
        received: (message: any) => {
          console.log("MESSAGE:", message)
        },
      },
    )
  }, [])

  const dummy = {
    store: "ALDO Montreal",
    shoe: "NIKE",
    inventory: 80
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col space-y-1 my-8">
        <h1 className="text-4xl font-semibold">Aldo Live stats</h1>
        <h4 className="text-md text-gray-400">{new Date().toDateString()}</h4>
      </div>

      <div className="flex gap-4 w-full">
        
        <Store _data={dummy} />

      </div>
    </div>
  )
}

export default Dashboard