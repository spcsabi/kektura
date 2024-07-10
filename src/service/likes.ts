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
import { Likes } from "../types/Likes";


const converter = {
  toFirestore(like: Likes) {
    return like;
  },
  fromFirestore(snap: DocumentSnapshot, options: SnapshotOptions): Likes {
    const data = snap.data(options) as Omit<Likes, "id">;
    return {
      id: snap.id,
      ...data,
    };
  },
};

export const likeCollection = collection(store, "likes").withConverter<Likes>(
  converter
);

export function likeQuery(uid: string) {
  return query(likeCollection, where("uid", "==", uid));
}

export function likeNumQuery() {
  return query(likeCollection);
}

export async function setLike(like: Likes) {
  return await setDoc(doc(store, "likes", like.id), like);
}

export async function deleteLike(id: string) {
  return await deleteDoc(doc(store, "likes", id));
}

export function getLikesDoc(id: string) {
  return doc(store, "likes", id).withConverter<Likes>(converter);
}
