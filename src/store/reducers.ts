import type { Store } from "./store.types";

const initialState: Store = {
  user: null
};

const storeReducer = (state: Store = initialState, action: any) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default storeReducer;
