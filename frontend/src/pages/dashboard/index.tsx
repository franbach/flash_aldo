import { useEffect } from "react"
import { action } from "@/app/helpers"
import { graphql } from "@/app/helpers"
import { useQuery } from "@apollo/client"
import { dispatcher } from "@/app/redux/helper"
import { useAppSelector } from "@/app/redux/hooks"
import { app_set_stores, app_update_entry, app_hide_warnings } from "@/pages/dashboard/redux/actions"
import { QUERY_ALL_STORES } from "@/app/graphql/queries"
import { get_app_warnings } from "./redux/selectors"
import Store from "@/ui/modules/store"

/**
 * Defers page initialization.
 * It is called before page mounting. Similar behaviour NextJs.
 * p.s.: it's being called in the initialize function.
 */
export const getStoresData = async () => {
  let response;

  try {
    response = await graphql.client.query({
      query: QUERY_ALL_STORES,
      variables: {},
    })
  } catch (e) {
    console.log("Something went wrong while querying the database", e)
  }

  await dispatcher(app_set_stores, response.data.stores)
  return response
}

const Dashboard: React.FC = () => {

  const all = useQuery(QUERY_ALL_STORES)

  const hide_warnings = useAppSelector(get_app_warnings)

  useEffect(() => {
    action.cable!.subscriptions.create(
      {
        channel: 'PipeChannel',
      },
      {
        connected: () => {
          console.log("Connected to pipe channel!")
        },
        received: async (message: any) => {
          await dispatcher(app_update_entry, message)
        },
      },
    )
  }, [])

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col space-y-1 my-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-4xl font-semibold">Aldo Live stats</h1>
          <button onClick={async () => await dispatcher(app_hide_warnings)} className="bg-gray-100 mt-1 text-gray-600 font-semibold rounded p-2 hover:bg-black hover:text-white transition-all duration-300">
            { hide_warnings 
              ? <p>Show Warnings</p>
              : <p>Hide Warnings</p>
            }
          </button>
        </div>  
        <h4 className="text-md text-gray-400">{new Date().toDateString()}</h4>
      </div>

      <div className="grid grid-cols-3 2xl:grid-cols-4 gap-4">
        { all.data.stores.map((store: any) => {
          return (
            <Store key={store.name} name={store.name} shoes={store.shoes}  />
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard