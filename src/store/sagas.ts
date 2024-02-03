import { EventChannel } from "redux-saga";
import { call, cancelled, put, take, takeEvery } from "redux-saga/effects";
import { Unsubscribe } from "firebase/firestore";
import { ADD_CARDS_LOCAL, FETCH_FIRESTORE } from "./constants";
import type { Card, FetchFirestore } from "./store.types";
import { firestoreChannel } from "../services/firebase";

function* fetchFirestore({payload}: FetchFirestore) {
  const channel: EventChannel<Unsubscribe> = yield call(firestoreChannel, payload);

  try {
    while (true) {
      const data: Card[] = yield take(channel);
      yield put({type: ADD_CARDS_LOCAL, payload: data});
      
      console.log('Data is updated.', data);
    }
  } finally {
    const val: boolean = yield cancelled();
    if (val) channel.close();
    
    console.log('Firebase channel is closed.');
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_FIRESTORE, fetchFirestore);
}

export default rootSaga;
