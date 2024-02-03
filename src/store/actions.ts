import {
  ADD_CARDS_LOCAL,
  FETCH_FIRESTORE,
} from "./constants";
import {
  AddCardsLocal,
  AddCardsLocalPayload,
  FetchFirestore,
  FetchFirestorePayload,
} from "./store.types";

export const fetchFirestoreAction = (payload: FetchFirestorePayload): FetchFirestore => ({type: FETCH_FIRESTORE, payload});
export const addCardsLocal = (payload: AddCardsLocalPayload): AddCardsLocal => ({type: ADD_CARDS_LOCAL, payload});
