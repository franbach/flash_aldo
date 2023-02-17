import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store";

const _get_all_stores = (state: RootState) => state.app.stores;
export const get_all_stores = createSelector(_get_all_stores, (stores) => stores);

const _get_store = (state: any, keys: string[]) => {
  return state.app.stores[keys[0]].shoes[keys[1]];
};

export const get_store = createSelector(_get_store, (store) => store);

const _get_app_warnings = (state: RootState) => state.app.ui.hidewarnings;
export const get_app_warnings = createSelector(_get_app_warnings, (warnings) => warnings);
