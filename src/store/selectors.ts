import { createDraftSafeSelector } from "@reduxjs/toolkit";
import type { Store } from "./store.types";

const getUser = (state: Store) => state.user;
const getCardsId = (state: Store) => state.user?.cardsId;
const getCards = (state: Store) => state.user?.cards;

export const getUserSelector = createDraftSafeSelector(
  getUser,
  (user) => user,
  {devModeChecks: {identityFunctionCheck: 'never'}}
);

export const getCardIdSelector = createDraftSafeSelector(
  getCardsId,
  (cardsId) => cardsId,
  {devModeChecks: {identityFunctionCheck: 'never'}}
);

export const getCardsSelector = createDraftSafeSelector(
  getCards,
  (cards) => cards,
  {devModeChecks: {identityFunctionCheck: 'never'}}
);
