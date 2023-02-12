import { useState, createContext, useEffect } from "react";
import { db } from "../server/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const DocumentCountContext = createContext();

export const DocumentCountProvider = ({ children }) => {
  const [postsCount, setPostsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  function DecreaseCountContext() {
    if (postsCount !== 0) {
      setPostsCount(postsCount - 1);
    }
  }

  function IncreaseCountContext() {
    setPostsCount(postsCount + 1);
  }

  const value = {
    postsCount,
    IncreaseCountContext,
    DecreaseCountContext,
  };

  // const postsCountCollectionRef = collection(db, "counting");

  const getPostsCount = async () => {
    // const q = query(postsCountCollectionRef, orderBy("createdAt", "desc"));

    // onSnapshot(q, (snapshot) => {
    //   const doc = snapshot.docs.map((doc) => ({ ...doc.data() }));
    //   setPostsCount(doc[0].postsCount);
    // });
    const postsCollectionRef = collection(db, "posts");

    const q = query(postsCollectionRef, orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ ...doc.data() }));
      setPostsCount(posts.length);
    });
    setLoading(false);
  };

  useEffect(() => {
    getPostsCount();
  }, []);

  return (
    <DocumentCountContext.Provider value={value}>
      {!loading && children}
    </DocumentCountContext.Provider>
  );
};
