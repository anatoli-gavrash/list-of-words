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
