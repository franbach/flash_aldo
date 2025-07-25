import { getApolloClient } from "@/app/helpers";
import { TRANSFER_SHOES } from "@/app/graphql/mutations";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { StoreDto, TransferPayload, UpdateEntryPayload } from "./types";

export const app_set_stores = createAction<StoreDto[]>("app/set_stores");
export const app_update_entry = createAction<UpdateEntryPayload>("app/update_entry");
export const app_hide_warnings = createAction("app/hide_warnings");

export const app_transfer_shoe = createAsyncThunk<{ data: unknown }, TransferPayload, { rejectValue: unknown }>(
  "app_transfer_shoe",
  async (payload, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    /**
     * Update the entries in the database
     */
    let data: unknown;
    try {
      const response = await getApolloClient().mutate({
        mutation: TRANSFER_SHOES,
        variables: { input: payload.transfer },
      });
      data = response.data;
    } catch (e) {
      throw rejectWithValue(e as unknown);
    }

    try {
      /**
       * Update the entries in the state
       */
      dispatch(app_update_entry(payload));
    } catch (e) {
      throw rejectWithValue(e as unknown);
    }

    return { data };
  },
);
