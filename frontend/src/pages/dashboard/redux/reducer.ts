import { createReducer, type PayloadAction } from "@reduxjs/toolkit";
import { app_set_stores, app_update_entry, app_hide_warnings } from "@/pages/dashboard/redux/actions";
import type { StoreDto, UpdateEntryPayload } from "@/pages/dashboard/redux/types";

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
    .addCase(app_set_stores, (state, { payload }: PayloadAction<StoreDto[]>) => {
      let hash: {
        [key: string]: {
          id: string;
          name: string;
          shoes: { [key: string]: IShoe };
        };
      } = {};

      payload.forEach((store) => {
        hash[store.name] = {
          id: store.id,
          name: store.name,
          shoes: {},
        };

        store.shoes.forEach((shoe) => {
          hash[store.name].shoes[shoe.name] = {
            id: shoe.id,
            name: shoe.name,
            inventory: shoe.inventory,
          };
        });
      });

      state.stores = hash;
    })
    .addCase(app_update_entry, (state, { payload }: PayloadAction<UpdateEntryPayload>) => {
      /**
       * Logic for adding and removing the shoes in question
       */
      if ("transfer" in payload) {
        const fromStoreName = payload.transfer.from;
        const shoeName = payload.transfer.shoe;
        const toStoreName = payload.transfer.to;
        const amount = payload.transfer.amount;

        const fromStore = state.stores[fromStoreName];
        const toStore = state.stores[toStoreName];

        const fromShoe = fromStore.shoes[shoeName];
        const toShoe = toStore.shoes[shoeName];

        /**
         * Removes shoes from the store that is sending
         */
        fromShoe.inventory = fromShoe.inventory - amount;

        /**
         * Adds the shoes that is receiving with the existing inventory amount
         */
        toShoe.inventory = toShoe.inventory + amount;
      } else {
        /**
         * Logic to update existing inentory entry
         */
        const storeName = payload.store;
        const shoeName = payload.name;

        const store = state.stores[storeName];
        const shoe = store.shoes[shoeName];
        shoe.inventory = payload.inventory;
      }
    })
    .addCase(app_hide_warnings, (state) => {
      if (state.ui.hidewarnings) {
        state.ui.hidewarnings = false;
      } else {
        state.ui.hidewarnings = true;
      }
    });
});
