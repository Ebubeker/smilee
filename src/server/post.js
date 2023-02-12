import { storage, db } from "./firebase";
import { query, where, getDocs } from "firebase/firestore";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

export function uploadImageToStorage(image) {
  const imageRef = ref(storage, `postImages/${image.name + v4()}`);
  return uploadBytes(imageRef, image)
    .then(() => {
      return {
        success: true,
        reference: imageRef,
      };
    })
    .catch((err) => {
      return {
        success: false,
        error: err,
      };
    });
}

export async function createPost(image, description, userID) {
  // if(description.includes("#"))
  const postsCollectionRef = collection(db, "posts");

  await addDoc(postsCollectionRef, {
    image: image,
    body: description,
    creatorID: userID,
    tags: "#static",
    comments: [],
    likes: [],
    shares: [],
    createdAt: serverTimestamp(),
  })
    .then((data) => {})
    .catch((err) => console.log(err));
}

export async function getPosts() {
  return await db
    .collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        return doc.data();
      });
    });
}

export async function getPostsByID(id) {
  if (id) {
    const q = query(collection(db, "posts"), where("creatorID", "==", id));
    let data = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });

    if (data.length === 0) {
      return { status: false };
    } else {
      return { data: data, status: true };
    }
  }
}

export async function likePost(postId, UserId, currentLikes, type) {
  if (type === "add") {
    const postRef = doc(db, "posts", postId);
    currentLikes.push(UserId);
    await updateDoc(postRef, { likes: currentLikes });
  } else {
    const postRef = doc(db, "posts", postId);
    if (currentLikes.length && currentLikes.includes(UserId)) {
      currentLikes.splice(currentLikes.indexOf(UserId), 1);
      await updateDoc(postRef, { likes: currentLikes });
    }
  }
}

export async function createComment(data) {
  const postsCollectionRef = collection(db, "comments");
  const returnData = [];

  await addDoc(postsCollectionRef, { ...data, createdAt: serverTimestamp() })
    .then((data) => {
      returnData.push(data.id);
    })
    .catch((err) => console.log(err));

  return { id: returnData[0], createdAt: serverTimestamp() };
}

export async function commentPost(postId, commentId, currentComments) {
  const postRef = doc(db, "posts", postId);
  currentComments.push(commentId);
  await updateDoc(postRef, { comments: currentComments });
}
