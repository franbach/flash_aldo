import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { dashboardReducer } from "@/pages/dashboard/redux/reducer";

export const store = configureStore({
  reducer: {
    app: dashboardReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
