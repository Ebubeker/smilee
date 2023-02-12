import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../server/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { updateUserFollow, updateUserUnfollow } from "../server/user";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const value = {
    userData,
    updateFollowList,
  };

  function updateFollowList(userId, type) {
    if (type === "follow") {
      updateUserFollow(userData.uid, userData.following, userId);
      userData.following.unshift(userId);
    } else {
      updateUserUnfollow(userData.uid, userData.following, userId);
      let newFollowingList = userData.following.filter(
        (userListId) => userListId !== userId
      );
      userData.following = newFollowingList;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "users", user.uid), (snap) => {
          setUserData({ ...snap.data(), uid: user.uid });
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, "500");
    });

    return unsubscribe;
  }, []);

  return (
    <UserDataContext.Provider value={value}>
      {!loading && children}
    </UserDataContext.Provider>
  );
};
