import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { dashboardReducer } from "@/pages/dashboard/redux/reducer";
import { listenerMiddleware } from "@/app/redux/listeners";

export const store = configureStore({
  reducer: {
    app: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
