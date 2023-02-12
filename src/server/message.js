import { storage, db } from "./firebase";
import { query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function createMessage(messageBody) {
  // if(description.includes("#"))
  const messagesCollectionRef = collection(db, "messages");

  await addDoc(messagesCollectionRef, {
    ...messageBody,
    createdAt: serverTimestamp(),
  });
  return {
    data: {
      ...messageBody,
      createdAt: serverTimestamp(),
    },
  };
}

export async function getMessages(reciever, sender) {
  if (reciever && sender) {
    const q = query(
      collection(db, "messages"),
      where("reciever", "==", reciever),
      where("sender", "==", sender),
      orderBy("createdAt"),
      limit(20)
    );

    const q2 = query(
      collection(db, "messages"),
      where("reciever", "==", sender),
      where("sender", "==", reciever),
      orderBy("createdAt"),
      limit(20)
    );

    let data = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let gottenData = doc.data();
      gottenData.createdAt = gottenData.createdAt.toDate();
      data.push(gottenData);
    });

    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      let gottenData = doc.data();
      gottenData.createdAt = gottenData.createdAt.toDate();
      data.push(gottenData);
    });

    data.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    console.log(data);

    if (data.length === 0) {
      return { status: false };
    } else {
      return { data: data, status: true };
    }
  }
}
