import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { app_hide_warnings, app_update_entry } from "@/pages/dashboard/redux/actions";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: app_update_entry,
  effect: async (action) => {
    if (!("transfer" in action.payload)) return;

    toast.success(
      `${action.payload.transfer.from} just sent ${action.payload.transfer.amount} pairs of shoes to ${action.payload.transfer.to}`,
      {
        theme: "light",
      },
    );
  },
});

listenerMiddleware.startListening({
  actionCreator: app_hide_warnings,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as { app: { ui: { hidewarnings: boolean } } };
    if (!state.app.ui.hidewarnings) {
      toast.dismiss();
    }
  },
});
