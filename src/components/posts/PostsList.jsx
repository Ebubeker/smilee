import React, { useContext, useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import { PostsContext } from "../../context/PostContext";
import Post from "./Post";
import { getPostsByID } from "../../server/post";
import { PostDescription } from "./PostStyled";

const PostsList = ({ type, uids, getCount }) => {
  const { posts, incresePostsLimit } = useContext(PostsContext);
  const [postsById, setPostsById] = useState(null);

  useEffect(() => {
    if (uids.length > 0) {
      getPostsByID(uids[0]).then((data) => {
        setPostsById(data);
        getCount(data.data.length);
      });
    }
  }, []);

  window.onscroll = function () {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight
    ) {
      incresePostsLimit();
    }
  };

  if (type === "profile" && uids.length > 0 && postsById) {
    return (
      <>
        {postsById.status ? (
          postsById.data.map((post, indx) => <Post key={indx} post={post} />)
        ) : (
          <PostDescription>You have no content</PostDescription>
        )}
      </>
    );
  } else {
    return (
      <>
        <CreatePost />
        {posts.map((post, indx) => (
          <Post key={indx} post={post} />
        ))}
      </>
    );
  }
};

export default PostsList;
