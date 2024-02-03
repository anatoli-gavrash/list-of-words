import {
  ADD_CARD,
  ADD_CARDS_LOCAL,
  ADD_IMAGE,
  DELETE_CARD,
  FETCH_FIRESTORE,
  UPDATE_CARD
} from "./constants";
import {
  AddCard,
  AddCardPayload,
  AddCardsLocal,
  AddCardsLocalPayload,
  AddImage,
  AddImagePayload,
  DeleteCard,
  DeleteCardPayload,
  FetchFirestore,
  FetchFirestorePayload,
  UpdateCard,
  UpdateCardPayload
} from "./store.types";

export const fetchFirestoreAction = (payload: FetchFirestorePayload): FetchFirestore => ({type: FETCH_FIRESTORE, payload});
export const addCard = (payload: AddCardPayload): AddCard => ({type: ADD_CARD, payload});
export const updateCard = (payload: UpdateCardPayload): UpdateCard => ({type: UPDATE_CARD, payload});
export const deleteCard = (payload: DeleteCardPayload): DeleteCard => ({type: DELETE_CARD, payload});
export const addImage = (payload: AddImagePayload): AddImage => ({type: ADD_IMAGE, payload});
export const addCardsLocal = (payload: AddCardsLocalPayload): AddCardsLocal => ({type: ADD_CARDS_LOCAL, payload});
