import React, { useContext, useRef } from "react";
import {
  Form,
  CommentField,
  CommentProfile,
  Textarea,
  PostButton,
} from "./PostStyled";
import { UserDataContext } from "../../context/UserDataContext";
import { useAuth } from "../../context/AuthContext";
import { createComment } from "../../server/post";
import { commentPost } from "../../server/post";
import { PostsContext } from "../../context/PostContext";

const CreateComment = ({ type, postId, comments }) => {
  const { userData } = useContext(UserDataContext);
  const { saveCommentToContext } = useContext(PostsContext);
  const { currentUser } = useAuth();
  const commentDesc = useRef(null);

  function commentOnPost(e) {
    e.preventDefault();
    let commentData = {};
    if (type === "main") {
      commentData = {
        commentDescription: commentDesc.current.value,
        likes: [],
        subComment: false,
        subComments: [],
        creatorId: currentUser.uid,
        postId: postId,
        pinned: false,
      };
    } else if (type === "sub") {
      commentData = {
        commentDescription: commentDesc.current.value,
        likes: [],
        subComment: true,
        creatorId: currentUser.uid,
        postId: postId,
        pinned: false,
      };
    }
    commentDesc.current.value = "";
    createComment(commentData).then((data) => {
      commentPost(postId, data.id, comments);
      saveCommentToContext(postId, data.id);
    });
  }

  return (
    <Form onSubmit={commentOnPost} style={{ marginBottom: "30px" }}>
      <CommentField>
        <CommentProfile src={userData.photo} alt="Comment Profile" />
        <Textarea
          ref={commentDesc}
          style={{
            width: "250px",
            height: "65px",
            background: "#b2b3c2",
            color: "#4b4b4d",
          }}
          placeholder="Add comment..."
          placeholderColor="#4b4b4d"
        />
      </CommentField>
      <PostButton>Submit Comment</PostButton>
    </Form>
  );
};

export default CreateComment;
