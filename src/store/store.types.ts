import {
  ADD_CARD,
  ADD_CARDS_LOCAL,
  ADD_IMAGE,
  DELETE_CARD,
  FETCH_FIRESTORE,
  UPDATE_CARD
} from "./constants";


export interface Store {
  user: User | null
}

export interface User {
  id: number
  cardsId: string
  cards: Card[]
}

export interface Card {
  configs: {
    cardStyle: {
      color: string
      type: string
    }
    titleStyle: {
      color: string
    }
  }
  coverImage: string
  title: {
    en: string
    ru: string
  }
  words: Word[]
}

export interface Word {
  learnWord: string
  translate: {
    en: string
    ru: string
  }
}

export interface FetchFirestore {
  type: typeof FETCH_FIRESTORE
  payload: FetchFirestorePayload
}

export interface FetchFirestorePayload {
  cardsId: string
}

export interface AddCard {
  type: typeof ADD_CARD
  payload: AddCardPayload
}

export interface AddCardPayload {
  cardsId: string
  card: Card
}

export interface UpdateCard {
  type: typeof UPDATE_CARD
  payload: UpdateCardPayload
}

export interface UpdateCardPayload {
  cardsId: string
  oldCard: Card
  newCard: Card
}

export interface DeleteCard {
  type: typeof DELETE_CARD
  payload: DeleteCardPayload
}

export interface DeleteCardPayload {
  cardsId: string
  card: Card
}

export interface AddImage {
  type: typeof ADD_IMAGE
  payload: AddImagePayload
}

export interface AddImagePayload {
  cardsId: string
  image: File
}

export interface AddCardsLocal {
  type: typeof ADD_CARDS_LOCAL
  payload: AddCardsLocalPayload
}

export interface AddCardsLocalPayload {
  cards: Card[]
}

export type StoreActions = FetchFirestore | AddCard | UpdateCard | DeleteCard | AddImage | AddCardsLocal
