import { store } from "@/app/redux/store";

export function dispatcher(action: any, args?: any) {
  return store.dispatch((dispatch, getState) => {
    return dispatch(action(args));
  });
}
