import { EventChannel, eventChannel } from "redux-saga";
import { call, cancelled, put, take, takeEvery } from "redux-saga/effects";
import { Firestore, Unsubscribe, arrayRemove, arrayUnion, doc, getFirestore, onSnapshot, updateDoc, writeBatch } from "firebase/firestore";
import { firebaseApp } from "../firebase";
import { ADD_CARD, ADD_CARDS_LOCAL, ADD_IMAGE, DELETE_CARD, FETCH_FIRESTORE, UPDATE_CARD } from "./constants";
import type { AddCard, AddImage, Card, DeleteCard, FetchFirestore, FetchFirestorePayload, UpdateCard } from "./store.types";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { randomInteger } from "../utils/utils";

const firestoreChannel = (payload: FetchFirestorePayload): EventChannel<Unsubscribe> => {
  return eventChannel((emitter) => {
    const db: Firestore = getFirestore(firebaseApp);
    const docRef = doc(db, 'cards', payload.cardsId);
    
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data()?.cards || [];
      if (data.length > 0) emitter(data);
    });

    return unsubscribe;
  })
};

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

function* addCard({payload}: AddCard) {
  try {
    const db: Firestore = yield call(() => getFirestore(firebaseApp));
    const docRef = doc(db, 'cards', payload.cardsId);
    
    yield call(() => updateDoc(docRef, {cards: arrayUnion(payload.card)}));

    console.log('Document was written.');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

function* updateCard({payload}: UpdateCard) {
  try {
    const db: Firestore = yield call(() => getFirestore(firebaseApp));
    const docRef = doc(db, 'cards', payload.cardsId);
    const batch = writeBatch(db);

    batch.update(docRef, {cards: arrayRemove(payload.oldCard)});
    batch.update(docRef, {cards: arrayUnion(payload.newCard)});

    yield batch.commit();
    console.log('Document updated.');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}

function* deleteCard({payload}: DeleteCard) {
  try {
    const db: Firestore = yield call(() => getFirestore(firebaseApp));
    const docRef = doc(db, 'cards', payload.cardsId);
    
    yield call(() => updateDoc(docRef, {cards: arrayRemove(payload.card)}));
    console.log('Document data has been deleted.');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
}

function* addImage({payload}: AddImage) {
  const storage = getStorage();
  const imageRef = ref(
    storage,
    `images/${payload.cardsId}-${randomInteger()}.${(payload.image.type).split('/').pop()}
  `);

  yield call(uploadBytes, imageRef, payload.image);

  console.log('Uploaded a blob or file!');
}

function* rootSaga() {
  yield takeEvery(FETCH_FIRESTORE, fetchFirestore);
  yield takeEvery(ADD_CARD, addCard);
  yield takeEvery(UPDATE_CARD, updateCard);
  yield takeEvery(DELETE_CARD, deleteCard);
  yield takeEvery(ADD_IMAGE, addImage);
}

export default rootSaga;
