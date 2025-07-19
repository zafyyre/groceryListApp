import { db } from '../../firebase/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

export const addItem = async (groceryItem) => {
  const ref = await addDoc(collection(db, 'groceryItems'), { groceryItem });
  return ref.id;
};

export const listenToItems = (callback) =>
  onSnapshot(collection(db, 'groceryItems'), (snapshot) =>
    // Call the callback with the current items
    // Map the snapshot to an array of items
    callback(snapshot.docs.map(doc => ({
      id: doc.id,
      groceryItem: doc.data().groceryItem
    })))
);

export const updateItem = async (id, groceryItem) => {
  const itemRef = doc(db, 'groceryItems', id);
  await updateDoc(itemRef, { groceryItem });
};

export const deleteItem = async (id) => {
  await deleteDoc(doc(db, 'groceryItems', id));
};
