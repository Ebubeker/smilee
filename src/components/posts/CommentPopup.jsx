import React, { useEffect, useState } from "react";
import {
  CommentsOverlay,
  SectionTitle,
  Date,
  CommentsList,
  Xmark,
  Card,
  CommentButtons,
} from "./PostStyled";
// import Card from "../utils/Card";
import CreateComment from "./CreateComment";
import { getCommentsForPost } from "../../server/comments";
import Comment from "./Comment";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentPopup = ({ close, comments, postId }) => {
  const [allComments, setAllComments] = useState([]);
  const [postLimit, setpostLimit] = useState(5);

  useEffect(() => {
    getCommentsForPost(postId, postLimit).then((data) => {
      if (data.data) {
        setAllComments(data.data);
      }
    });
  }, [comments, postLimit]);

  return (
    <CommentsOverlay>
      <Card color="#707180" position="relative">
        <Xmark onClick={close}>
          <FontAwesomeIcon icon={faXmark} />
        </Xmark>
        <SectionTitle>Comments</SectionTitle>
        <CreateComment type="main" postId={postId} comments={comments} />
        {!allComments.length ? (
          <Date style={{ marginTop: "20px" }}>
            Be the first to add a comment
          </Date>
        ) : (
          <>
            <CommentsList>
              {allComments.map((comment, indx) => {
                if (!comment.subComment) {
                  if (comment.subComments.length) {
                    return (
                      <Comment
                        key={indx}
                        comment={comment}
                        subComments={comment.subComments}
                      />
                    );
                  } else {
                    return <Comment key={indx} comment={comment} />;
                  }
                }
              })}
              <CommentButtons
                onClick={() => setpostLimit(postLimit + 5)}
                style={{ fontSize: "16px" }}
              >
                Load More Comments..
              </CommentButtons>
            </CommentsList>
          </>
        )}
      </Card>
    </CommentsOverlay>
  );
};

export default CommentPopup;
