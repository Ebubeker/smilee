import { useState, createContext, useEffect } from "react";
import { db } from "../server/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export const PostsContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  function incresePostsLimit() {
    setCurrentLimit(currentLimit + 10);
    getPosts();
  }

  // function increasePostsLimitByOne() {
  //   setCurrentLimit(currentLimit + 1);
  // }

  // function decreasePostsLimitByOne() {
  //   if (currentLimit) {
  //     setCurrentLimit(currentLimit - 1);
  //   }
  // }

  const addPostToTheContext = (image, description, userID) => {
    const postItem = {
      image: image,
      body: description,
      creatorID: userID,
      tags: "#static",
      comments: [],
      likes: [],
      shares: [],
      createdAt: serverTimestamp(),
    };
    setPosts([...posts, postItem]);
  };

  const updatePostInfo = (id, currentUserId, type) => {
    if (type === "add") {
      const element = posts.find((post) => post.uid === id);
      if (element) {
        element.likes.push(currentUserId);
      }
    } else {
      const element = posts.find((post) => post.uid === id);
      if (
        element &&
        element.likes.length &&
        element.likes.includes(currentUserId)
      ) {
        element.likes.splice(element.likes.indexOf(currentUserId), 1);
      }
    }
  };

  const saveCommentToContext = (id, commentId) => {
    const element = posts.find((post) => post.uid === id);
    if (element) {
      element.comments.push(commentId);
    }
  };

  const value = {
    posts,
    incresePostsLimit,
    addPostToTheContext,
    updatePostInfo,
    saveCommentToContext,
  };

  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    const q = query(
      postsCollectionRef,
      orderBy("createdAt", "desc"),
      limit(currentLimit)
    );

    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc._key.path.segments[6],
      }));
      setPosts(posts);
    });
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider value={value}>
      {!loading && children}
    </PostsContext.Provider>
  );
};
