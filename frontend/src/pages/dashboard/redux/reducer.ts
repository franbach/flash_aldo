import { createReducer, current } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { app_set_stores, app_update_entry, app_hide_warnings } from "@/pages/dashboard/redux/actions";

export interface IShoe {
  id: string;
  name: string;
  inventory: number
}

export interface IStore {
  id: string;
  name: string;
  shoes: Array<IShoe>
}

export interface IStores {
  stores: {
    [key: string]: IStore
  }
}

interface InitialState {
  stores: {},
  ui: {
    hidewarnings: boolean
  }
}

export const initialState: InitialState = {
  stores: {},
  ui: {
    hidewarnings: false
  }
}

export const dashboardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(app_set_stores, (state, { payload }: any) => {

      let hash: { [key: string]: { id: string, name: string, shoes: { [key: string]: any } } } = {}

      payload.forEach((store: any) => {
        hash[store.name] = {
          id: store.id,
          name: store.name,
          shoes: {}
        }

        store.shoes.forEach((shoe: any) => {
          hash[store.name].shoes[shoe.name] = {
            id: shoe.id,
            name: shoe.name,
            inventory: shoe.inventory
          }
        })
      })

      state.stores = hash
    })
    .addCase(app_update_entry, (state, { payload }: any) => {

      let store_name: string = payload.store
      let shoes_name: string = payload.name

      // @ts-ignore
      state.stores[store_name].shoes[shoes_name] = {
        //@ts-ignore
        ...state.stores[store_name].shoes[shoes_name],
        inventory: payload.inventory
      }

      if (payload.inventory < 25 && !state.ui.hidewarnings) {
        toast.warn(`${store_name} running low on ${shoes_name} shoes`, {
          theme: "light"
        })
      }
    })
    .addCase(app_hide_warnings, (state) => {
      if (state.ui.hidewarnings) {
        state.ui.hidewarnings = false
        toast.dismiss()
      } else {
        state.ui.hidewarnings = true
      }

    })
});
