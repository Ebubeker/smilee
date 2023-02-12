import React, { useEffect, useState } from "react";
import {
  CommentContext,
  Block,
  CommentorSubProfile,
  InfoBlock,
  Username,
  Time,
  Count,
  SubCommentDescript,
  Grouper,
} from "./PostStyled";
import { getUserViaID } from "../../server/user";
import { useAuth } from "../../context/AuthContext";
import { timeToHourTillNow } from "../../utils/helpers/smallTweaks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { likeComment } from "../../server/comments";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Subcomment = ({ comment, updateComment }) => {
  const [postUser, setPostUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [likedComment, setLikeComment] = useState(false);
  const [commentStatus, setCommentStatus] = useState(comment);
  const { currentUser } = useAuth();

  function getTime(date) {
    const hours = timeToHourTillNow(date);
    return `${hours}h`;
  }

  function addLikeToComment(userId, type) {
    if (type === "add") {
      let commentLikes = commentStatus.likes;
      commentStatus.likes = commentLikes;
    } else if (type === "remove") {
      if (commentStatus.likes.includes(userId)) {
        commentStatus.likes.splice(commentStatus.likes.indexOf(userId), 1);
      }
    }
  }

  function likeTheComment() {
    setLikeComment(!likedComment);
    if (!likedComment) {
      likeComment(commentStatus.uid, currentUser.uid, comment.likes, "add");
      addLikeToComment(currentUser.uid, "add");
    } else {
      likeComment(commentStatus.uid, currentUser.uid, comment.likes, "remove");
      addLikeToComment(currentUser.uid, "remove");
    }
  }

  useEffect(() => {
    getUserViaID(comment.creatorId)
      .then((data) => {
        setPostUser(data.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
    if (comment.likes.includes(currentUser.uid)) {
      setLikeComment(true);
    } else {
      setLikeComment(false);
    }
  }, [comment]);

  if (isLoaded) {
    return (
      <CommentContext>
        <Grouper>
          <Block>
            <CommentorSubProfile src={postUser.photo} alt="commentor" />
          </Block>
          <Block style={{ marginLeft: "15px", width: "190px" }}>
            <InfoBlock>
              <Username>@{postUser.username}</Username>{" "}
              <Time>{getTime(comment.createdAt.toDate())}</Time>
            </InfoBlock>
            <SubCommentDescript>
              {comment.commentDescription}
            </SubCommentDescript>
          </Block>
        </Grouper>
        <Block>
          <FontAwesomeIcon
            onClick={likeTheComment}
            style={{
              fontSize: "13px",
              color: !likedComment ? "white" : "#819deb",
              cursor: "pointer",
            }}
            icon={!likedComment ? unfilledHeart : faHeart}
          />
          <Count style={{ fontSize: "10px" }}>{comment.likes.length}</Count>
        </Block>
      </CommentContext>
    );
  } else {
    return <p style={{ color: "white" }}>Loading...</p>;
  }
};

export default Subcomment;
