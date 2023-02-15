import { db, storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  getDocs,
  query,
  collection,
  documentId,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

export async function getNewUsers(currentFollowList) {
  if (!currentFollowList.length) {
    const q = query(collection(db, "users"));
    let data = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({ ...doc.data(), uid: doc._key.path.segments[6] });
    });

    return data;
  } else {
    const q = query(
      collection(db, "users"),
      where(documentId(), "not-in", currentFollowList)
    );
    let data = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({ ...doc.data(), uid: doc._key.path.segments[6] });
    });

    return data;
  }
}

export async function getUsersIFollow(currentFollowList) {
  if (currentFollowList.length) {
    const q = query(
      collection(db, "users"),
      where(documentId(), "in", currentFollowList)
    );
    let data = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({ ...doc.data(), uid: doc._key.path.segments[6] });
    });

    return data;
  } else {
    return [];
    // const q = query(
    //   collection(db, "users"),
    //   where(documentId(), "in", currentFollowList)
    // );
    // let data = [];

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   data.push({ ...doc.data(), uid: doc._key.path.segments[6] });
    // });

    // return data;
  }
}

export async function getUserViaID(id) {
  const q = query(collection(db, "users"), where(documentId(), "==", id));
  let data = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push({ ...doc.data(), uid: doc._key.path.segments[6] });
  });

  if (data.length === 0) {
    return {
      data: {
        username: "Deleted",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/smilee-83d61.appspot.com/o/userPhotos%2F360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg?alt=media&token=6eb15316-5b3e-4a50-b3fa-3e002696536d",
      },
    };
  } else {
    return { data: data[0] };
  }
}

export async function updateUserInformation(data, uid) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
}

export async function uploadUserImageToStorage(image) {
  if (image.name) {
    const imageRef = ref(storage, `userPhotos/${image.name + v4()}`);
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
}

export async function updateUserFollow(
  currentUserId,
  currentUserFollowList,
  userFollowed
) {
  const userRef = doc(db, "users", currentUserId);
  currentUserFollowList.unshift(userFollowed);
  await updateDoc(userRef, { following: currentUserFollowList });

  getUserViaID(userFollowed).then((data) => {
    const userBeingFollowed = doc(db, "users", userFollowed);
    let followersList = data.data.followers;
    followersList.unshift(currentUserId);
    updateDoc(userBeingFollowed, { followers: followersList });
  });
}

export async function updateUserUnfollow(
  currentUserId,
  currentUserFollowList,
  userFollowed
) {
  const userRef = doc(db, "users", currentUserId);
  let newList = currentUserFollowList.filter(
    (userOnList) => userOnList !== userFollowed
  );
  await updateDoc(userRef, { following: newList });

  getUserViaID(userFollowed).then((data) => {
    const userBeingFollowed = doc(db, "users", userFollowed);
    let followersList = data.followers.filter(
      (userOnList) => userOnList !== currentUserId
    );
    updateDoc(userBeingFollowed, { followers: followersList });
  });
}
