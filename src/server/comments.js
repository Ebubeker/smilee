import { db } from "./firebase";
import {
  query,
  where,
  getDocs,
  limit,
  documentId,
  orderBy,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function getCommentsForPost(postId, limitCount) {
  if (postId) {
    const commentsCollectionRef = collection(db, "comments");
    const q = query(
      commentsCollectionRef,
      orderBy("createdAt", "desc"),
      where("postId", "==", postId),
      where("subComment", "==", false),
      limit(limitCount)
    );
    let data = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), uid: doc._key.path.segments[6] });
    });

    if (data.length === 0) {
      return { status: false };
    } else {
      return { data: data, status: true };
    }
  }
}

export async function getSubComments(commentId, limitNr) {
  const q = query(
    collection(db, "comments"),
    where("commentParentId", "==", commentId),
    orderBy("createdAt", "desc"),
    limit(limitNr)
  );
  let data = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), uid: doc._key.path.segments[6] });
  });

  if (data.length !== 0) {
    return data;
  }
}

export async function likeComment(
  commentId,
  UserId,
  currentCommentLikes,
  type
) {
  if (type === "add") {
    const commentRef = doc(db, "comments", commentId);
    currentCommentLikes.push(UserId);
    await updateDoc(commentRef, { likes: currentCommentLikes });
  } else {
    const commentRef = doc(db, "comments", commentId);
    if (currentCommentLikes.length && currentCommentLikes.includes(UserId)) {
      currentCommentLikes.splice(currentCommentLikes.indexOf(UserId), 1);
      await updateDoc(commentRef, { likes: currentCommentLikes });
    }
  }
}

export async function updateSubComments(commentId, subCommentId, subcomments) {
  const commentRef = doc(db, "comments", commentId);
  subcomments.unshift(subCommentId);
  await updateDoc(commentRef, { subComments: subcomments });
}
