import { graphql } from "@/app/helpers";
import { dispatcher } from "@/app/redux/helper";
import { TRANSFER_SHOES } from "@/app/graphql/mutatuions";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const app_set_stores = createAction("app/set_stores");
export const app_update_entry = createAction("app/update_entry");
export const app_hide_warnings = createAction("app/hide_warnings");

export const app_transfer_shoe = createAsyncThunk("app_transfer_shoe", async (payload: any, { rejectWithValue }) => {
  /**
   * Update the entries in the database
   */
  const response = await graphql.client.mutate({
    mutation: TRANSFER_SHOES,
    variables: { input: payload.transfer },
  });

  const { data, error } = response;

  if (error) {
    throw rejectWithValue(error);
  }

  try {
    /**
     * Update the entries in the state
     */
    await dispatcher(app_update_entry, payload);
  } catch (e) {
    throw rejectWithValue(e);
  }

  return { data };
});
