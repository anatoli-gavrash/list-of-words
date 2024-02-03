import type { StoreActions, User } from "./store.types";
import { ADD_CARDS_LOCAL } from "./constants";

const initialState: User = {
  id: 892349823,
  cardsId: 'tYTeQrOnsyAM9BlQ2uP7',
  cards: []
};

const storeReducer = (state: User = initialState, action: StoreActions) => {
  switch(action.type) {
    case ADD_CARDS_LOCAL:
      return {
        ...state,
        cards: action.payload
      }
    default:
      return state;
  }
};

export default storeReducer;
