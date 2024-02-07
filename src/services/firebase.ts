import { EventChannel, eventChannel } from "redux-saga";
import { Unsubscribe, arrayRemove, arrayUnion, doc, getFirestore, onSnapshot, updateDoc, writeBatch } from "firebase/firestore";
import { getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { firebaseApp } from "../firebase";
import { randomInteger } from "../utils/utils";
import type { Card, FetchFirestorePayload } from "../store/store.types";

export const firestoreChannel = (payload: FetchFirestorePayload): EventChannel<Unsubscribe> => {
  return eventChannel((emitter) => {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, 'cards', payload.cardsId);
    
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data()?.cards || [];
      if (data.length > 0) emitter(data);
    });

    return unsubscribe;
  });
};

export const addCard = async (cardsId: string, card: Card): Promise<void> => {
  try {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, 'cards', cardsId);
    
    await updateDoc(docRef, {cards: arrayUnion(card)});

    console.log('Document was written.');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const updateCard = async (cardsId: string, oldCard: Card, newCard: Card): Promise<void> => {
  try {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, 'cards', cardsId);
    const batch = writeBatch(db);

    batch.update(docRef, {cards: arrayRemove(oldCard)});
    batch.update(docRef, {cards: arrayUnion(newCard)});

    await batch.commit();

    console.log('Document updated.');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const deleteCard = async (cardsId: string, card: Card): Promise<void> => {
  try {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, 'cards', cardsId);
    
    await updateDoc(docRef, {cards: arrayRemove(card)});

    console.log('Document data has been deleted.');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

export const addImage = async (cardsId: string, image: File): Promise<void> => {
  try {
    const storage = getStorage();
    const imageRef = ref(
      storage,
      `images/${cardsId}-${randomInteger()}.${(image.type).split('/').pop()}`
    );

    await uploadBytes(imageRef, image);

    console.log('Image file added!');
  } catch (error) {
    console.error('Image file has not been added.', error);
  }
};

export const getImageLinks = async (): Promise<string[] | undefined> => {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, 'images');
    const list = await listAll(imageRef);
    const [imageUrl, imageMedia] = [
      'https://firebasestorage.googleapis.com/v0/b/lang-lib.appspot.com/o/images%2F',
      '?alt=media'
    ];
    
    return list.items.map((item) => `${imageUrl}${item.name}${imageMedia}`);
  } catch (error) {
    console.error('Couldn\'t get the images.', error);
  }
};
