import { graphql } from "@/app/helpers"
import { TRANSFER_SHOES } from "@/app/graphql/mutatuions"
import { dispatcher } from "@/app/redux/helper"

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"

export const app_set_stores = createAction('app/set_stores')

export const app_update_entry = createAction('app/update_entry')

export const app_hide_warnings = createAction('app/hide_warnings')

export const app_transfer_shoe = createAsyncThunk("app_transfer_shoe", async (payload: any, { rejectWithValue }) => {

  await dispatcher(app_update_entry, payload)

  // const response = await graphql.client.query({
  //   query: TRANSFER_SHOES,
  //   variables: { id: payload },
  // });

  // const { data, loading, error } = response;

  // if (error) {
  //   throw rejectWithValue(error);
  // }

  // return { data, loading };

  return payload;
});