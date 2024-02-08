import type {
  ADD_CARDS_LOCAL,
  FETCH_FIRESTORE
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

export interface AddCardsLocal {
  type: typeof ADD_CARDS_LOCAL
  payload: AddCardsLocalPayload
}

export type AddCardsLocalPayload = Card[]

export type StoreActions = FetchFirestore | AddCardsLocal
