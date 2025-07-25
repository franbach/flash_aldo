import { useEffect } from "react";
import { getActionCableConsumer, getApolloClient } from "@/app/helpers";
import { useQuery } from "@apollo/client";
import { store } from "@/app/redux/store";
import { app_set_stores, app_update_entry } from "@/pages/dashboard/redux/actions";
import { QUERY_ALL_STORES } from "@/app/graphql/queries";
import Store from "@/ui/modules/store";

/**
 * Defers page initialization.
 * It is called before page mounting. Similar behaviour NextJs.
 * p.s.: it's being called in the initialize function.
 */
export const getStoresData = async () => {
  let response;

  try {
    response = await getApolloClient().query({
      query: QUERY_ALL_STORES,
      variables: {},
    });
  } catch (e) {
    console.log("Something went wrong while querying the database", e);
  }

  const stores = response?.data?.stores ?? [];
  store.dispatch(app_set_stores(stores));
  return response;
};

const Dashboard: React.FC = () => {
  const all = useQuery(QUERY_ALL_STORES);
  const stores = all.data?.stores ?? [];

  useEffect(() => {
    let consumer: ReturnType<typeof getActionCableConsumer> | undefined;
    try {
      consumer = getActionCableConsumer();
    } catch {
      return;
    }

    consumer.subscriptions.create(
      {
        channel: "PipeChannel",
      },
      {
        connected: () => {
          console.log("Connected to pipe channel!");
        },
        received: async (message: any) => {
          store.dispatch(app_update_entry(message));
        },
      },
    );

    return () => {
      consumer?.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col space-y-1 my-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-4xl font-semibold">Aldo Live stats</h1>
        </div>
        <h4 className="text-md text-gray-400">{new Date().toDateString()}</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {stores.map((store: any) => {
          return <Store key={store.name} name={store.name} shoes={store.shoes} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
