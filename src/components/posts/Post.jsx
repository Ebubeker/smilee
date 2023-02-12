import React, { useContext, useEffect, useState } from "react";
import Card from "../utils/Card";
import {
  PostImage,
  PostHeader,
  Profile,
  Info,
  Name,
  Date,
  Interaction,
  WrapperInteraction,
  PostDescription,
  Count,
  IconContainer,
} from "./PostStyled";
import { getUserViaID } from "../../server/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMessage as filledFaMessage,
  faBookmark as filledFaBookmark,
  faPaperPlane as filledFaPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as unfilledHeart,
  faMessage,
  faBookmark,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { likePost } from "../../server/post";
import { useAuth } from "../../context/AuthContext";
import { PostsContext } from "../../context/PostContext";
import CommentPopup from "./CommentPopup";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [postUser, setPostUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [likedByMe, setLikedByMe] = useState(false);
  const [savedByMe, setSavedByMe] = useState(false);
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);

  const { currentUser } = useAuth();
  const { updatePostInfo } = useContext(PostsContext);

  useEffect(() => {
    getUserViaID(post.creatorID)
      .then((data) => {
        setPostUser(data.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });

    if (post.likes.includes(currentUser.uid)) {
      setLikedByMe(true);
    } else {
      setLikedByMe(false);
    }
  }, []);

  function likeThePost() {
    setLikedByMe(!likedByMe);
    if (!likedByMe) {
      likePost(post.uid, currentUser.uid, post.likes, "add");
      updatePostInfo(post.uid, currentUser.uid, "add");
    } else {
      likePost(post.uid, currentUser.uid, post.likes, "remove");
      updatePostInfo(post.uid, currentUser.uid, "remove");
    }
  }

  function openComments() {
    setCommentSectionOpen(true);
  }

  function closeComments() {
    setCommentSectionOpen(false);
  }

  if (isLoaded) {
    return (
      <>
        <Card>
          <Link
            to="/user"
            state={{ userPost: postUser }}
            style={{ textDecoration: "none" }}
          >
            <PostHeader>
              <Profile src={postUser.photo} alt="userAvatar" />
              <Info>
                <Name>@{postUser.username}</Name>
                <Date>22.3.2022</Date>
                {/* <Date>{post.createdAt}</Date> */}
              </Info>
            </PostHeader>
          </Link>
          <PostImage src={post.image} alt="post" />
          <Interaction>
            <WrapperInteraction>
              <IconContainer>
                <FontAwesomeIcon
                  onClick={likeThePost}
                  icon={!likedByMe ? unfilledHeart : faHeart}
                  style={{
                    color: !likedByMe ? "white" : "#5a82f2",
                    fontSize: "27px",
                    cursor: "pointer",
                  }}
                />
                <Count>{post.likes.length}</Count>
              </IconContainer>
              <IconContainer>
                <FontAwesomeIcon
                  onClick={openComments}
                  icon={faMessage}
                  style={{
                    color: "white",
                    fontSize: "27px",
                    cursor: "pointer",
                  }}
                />
                <Count>{post.comments.length}</Count>
              </IconContainer>
            </WrapperInteraction>
            <WrapperInteraction>
              <IconContainer style={{ marginRight: 0, marginLeft: "10px" }}>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  style={{
                    color: "white",
                    fontSize: "27px",
                    cursor: "pointer",
                  }}
                />
                <Count>{post.shares.length}</Count>
              </IconContainer>
              <IconContainer style={{ marginRight: 0, marginLeft: "10px" }}>
                <FontAwesomeIcon
                  icon={!savedByMe ? faBookmark : filledFaBookmark}
                  style={{
                    color: "white",
                    fontSize: "27px",
                    cursor: "pointer",
                  }}
                />
                <Count>0</Count>
              </IconContainer>
            </WrapperInteraction>
          </Interaction>
          <Date style={{ marginTop: "10px" }}>
            {post.comments.length === 0
              ? "No comments"
              : `${post.comments.length} comments`}
          </Date>
          <PostDescription>{post.body}</PostDescription>
        </Card>
        {commentSectionOpen && (
          <CommentPopup
            close={closeComments}
            comments={post.comments}
            postId={post.uid}
          />
        )}
      </>
    );
  } else {
    <p>loading</p>;
  }
};

export default Post;
