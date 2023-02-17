import { toast } from "react-toastify";
import { createReducer, current } from "@reduxjs/toolkit";
import { app_set_stores, app_update_entry, app_hide_warnings } from "@/pages/dashboard/redux/actions";

export type IShoe = {
  id: string;
  name: string;
  inventory: number;
};

export interface IStore {
  id: string;
  name: string;
  shoes: {
    [key: string]: IShoe;
  };
}

export type IStores = {
  [key: string]: IStore;
};

interface InitialState {
  stores: IStores;
  ui: {
    hidewarnings: boolean;
  };
}

export const initialState: InitialState = {
  stores: {},
  ui: {
    hidewarnings: false,
  },
};

export const dashboardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(app_set_stores, (state, { payload }: any) => {
      let hash: {
        [key: string]: {
          id: string;
          name: string;
          shoes: { [key: string]: any };
        };
      } = {};

      payload.forEach((store: any) => {
        hash[store.name] = {
          id: store.id,
          name: store.name,
          shoes: {},
        };

        store.shoes.forEach((shoe: any) => {
          hash[store.name].shoes[shoe.name] = {
            id: shoe.id,
            name: shoe.name,
            inventory: shoe.inventory,
          };
        });
      });

      state.stores = hash;
    })
    .addCase(app_update_entry, (state, { payload }: any) => {
      let store_name: string;
      let store_shoe: string;
      let shoe_amount: number;
      let transfer_to: string;

      /**
       * Logic for adding and removing the shoes in question
       */
      if (payload.transfer) {
        store_name = payload.transfer.from;
        store_shoe = payload.transfer.shoe;
        transfer_to = payload.transfer.to;
        shoe_amount = payload.transfer.amount;

        /**
         * Removes shoes from the store that is sending
         */
        state.stores[store_name].shoes[store_shoe].inventory =
          state.stores[store_name].shoes[store_shoe].inventory - shoe_amount;

        /**
         * Adds the shoes that is receiving with the existing inventory amount
         */
        state.stores[transfer_to].shoes[store_shoe].inventory =
          state.stores[transfer_to].shoes[store_shoe].inventory + shoe_amount;

        toast.success(`${store_name} just sent ${payload.transfer.amount} pairs of shoes to ${transfer_to}`, {
          theme: "light",
        });
      } else {
        /**
         * Logic to update existing inentory entry
         */
        store_name = payload.store;
        store_shoe = payload.name;

        state.stores[store_name].shoes[store_shoe].inventory = payload.inventory;
      }
    })
    .addCase(app_hide_warnings, (state) => {
      if (state.ui.hidewarnings) {
        state.ui.hidewarnings = false;
        toast.dismiss();
      } else {
        state.ui.hidewarnings = true;
      }
    });
});
