import {
  DocumentSnapshot,
  SnapshotOptions,
  collection,
  deleteDoc,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import store from "../firebase/store";
import { Stamp } from "../types/Stamp";

const converter = {
  toFirestore(stamp: Stamp) {
    return stamp;
  },
  fromFirestore(snap: DocumentSnapshot, options: SnapshotOptions): Stamp {
    const data = snap.data(options) as Omit<Stamp, "id">;
    return {
      id: snap.id,
      ...data,
    };
  },
};

export const stampCollection = collection(store, "stamps").withConverter<Stamp>(
  converter
);

export function stampQuery(uid: string) {
  return query(stampCollection, where("uid", "==", uid));
}

export async function setDoneStamp(stamp: Stamp) {
  return await setDoc(doc(store, "stamps", stamp.id), stamp);
}

export async function deleteStamp(id: string) {
  return await deleteDoc(doc(store, "stamps", id));
}

export function getstampDoc(id: string) {
  return doc(store, "stamps", id).withConverter<Stamp>(converter);
}
