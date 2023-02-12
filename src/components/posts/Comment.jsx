import React, { useEffect, useState, useRef } from "react";
import {
  CommentContext,
  Block,
  CommentorProfile,
  InfoBlock,
  Username,
  Time,
  CommentDesc,
  CommentButtons,
  Count,
  ReplyCommentCreator,
  ReplyLine,
  ReplyInput,
  SubCommentsList,
  Grouper,
} from "./PostStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as unfilledHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { getUserViaID } from "../../server/user";
import { timeToHourTillNow } from "../../utils/helpers/smallTweaks";
import { useAuth } from "../../context/AuthContext";
import {
  likeComment,
  updateSubComments,
  getSubComments,
} from "../../server/comments";
import { createComment } from "../../server/post";
import Subcomment from "./Subcomment";
import { Link } from "react-router-dom";

const Comment = ({ comment, subComments }) => {
  const [postUser, setPostUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [likedComment, setLikeComment] = useState(false);
  const [subCommentLimit, setSubCommentLimit] = useState(5);
  const [commentStatus, setCommentStatus] = useState(comment);
  const [replyComment, setReplyComment] = useState(false);
  const [subCommentInfo, setSubCommentInfo] = useState(null);
  const [openReplyes, setOpenReplyes] = useState(false);
  const { currentUser } = useAuth();
  const replyText = useRef(null);

  function getAllSubcomments() {
    if (subComments) {
      if (subComments.length) {
        getSubComments(commentStatus.uid, subCommentLimit).then((data) => {
          setSubCommentInfo(data);
        });
      }
    }
  }

  function sendReply() {
    if (replyText.current.value) {
      let value = replyText.current.value;
      let commentData = {
        commentDescription: value,
        likes: [],
        subComment: true,
        creatorId: currentUser.uid,
        commentParentId: commentStatus.uid,
        postId: comment.postId,
        pinned: false,
      };
      replyText.current.value = "";
      createComment(commentData).then((data) => {
        updateSubComments(comment.uid, data.id, comment.subComments);
        saveSubComment();
      });
    }
  }

  function saveSubComment(subComment) {
    getAllSubcomments();
  }

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

    if (commentStatus.likes.includes(currentUser.uid)) {
      setLikeComment(true);
    } else {
      setLikeComment(false);
    }

    getAllSubcomments();
  }, [comment, subCommentLimit]);

  if (isLoaded) {
    return (
      <>
        <CommentContext>
          <Block>
            <Link
              to="/user"
              state={{ userPost: postUser }}
              style={{ textDecoration: "none" }}
            >
              <CommentorProfile src={postUser.photo} alt="commentor" />
            </Link>
          </Block>
          <Block>
            <InfoBlock>
              <Link
                to="/user"
                state={{ userPost: postUser }}
                style={{ textDecoration: "none" }}
              >
                <Username>@{postUser.username}</Username>{" "}
              </Link>
              <Time>{getTime(comment.createdAt.toDate())}</Time>
            </InfoBlock>
            <CommentDesc>{comment.commentDescription}</CommentDesc>
            <Grouper>
              <CommentButtons onClick={() => setReplyComment(!replyComment)}>
                Reply
              </CommentButtons>
              <CommentButtons onClick={() => setOpenReplyes(!openReplyes)}>
                Open Replyes
              </CommentButtons>
            </Grouper>
            {replyComment && (
              <ReplyCommentCreator>
                <ReplyLine>
                  <ReplyInput ref={replyText} placeholder="Reply" />
                  <FontAwesomeIcon
                    onClick={sendReply}
                    style={{ marginRight: "5px", cursor: "pointer" }}
                    icon={faPaperPlane}
                  />
                </ReplyLine>
              </ReplyCommentCreator>
            )}
          </Block>
          <Block>
            <FontAwesomeIcon
              onClick={likeTheComment}
              style={{
                fontSize: "13px",
                color: !likedComment ? "white" : "#819deb",
                cursor: "pointer",
              }}
              icon={likedComment ? unfilledHeart : faHeart}
            />
            <Count style={{ fontSize: "10px" }}>{comment.likes.length}</Count>
          </Block>
        </CommentContext>
        {subCommentInfo && openReplyes && (
          <SubCommentsList>
            {subCommentInfo.map((subComment, indx) => (
              <Subcomment key={indx} comment={subComment} />
            ))}
            <CommentButtons
              onClick={() => setSubCommentLimit(subCommentLimit + 5)}
              style={{ fontSize: "16px" }}
            >
              Load More Comments..
            </CommentButtons>
          </SubCommentsList>
        )}
      </>
    );
  } else {
    return <p style={{ color: "white" }}>Loading...</p>;
  }
};

export default Comment;
