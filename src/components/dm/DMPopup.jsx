import React, { useRef, useContext, useState, useEffect } from "react";
import {
  TransparentBack,
  PopupBox,
  UserContext,
  CommentorProfile,
  Status,
  Name,
  Header,
  Footer,
  MessageFlexer,
  Messages,
  Message,
} from "./DMStyled";
import { ReplyLine, ReplyInput } from "../posts/PostStyled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { createMessage, getMessages } from "../../server/message";
import { UserDataContext } from "../../context/UserDataContext";

const DMPopup = ({ user, closeDm }) => {
  const [messageReply, setMessageReply] = useState(null);
  const [messages, setMessages] = useState(null);

  const messageText = useRef(null);

  const { userData } = useContext(UserDataContext);

  function updateMessages() {
    getMessages(user.uid, userData.uid).then((messages) => {
      setMessages(messages.data);
    });
  }

  function sendMessage() {
    if (messageText.current.value) {
      let messageContent = {
        description: messageText.current.value,
        reciever: user.uid,
        sender: userData.uid,
        liked: false,
      };

      if (messageReply) {
        messageContent = {
          ...messageContent,
          replied: true,
          repliedMessage: messageReply,
        };
      } else {
        messageContent = {
          ...messageContent,
          replied: false,
        };
      }

      createMessage(messageContent).then((data) => {
        setMessages([...messages, data.data]);
      });
      updateMessages();
      messageText.current.value = "";
    }
  }

  useEffect(() => {
    updateMessages();
  }, []);

  return (
    <>
      <TransparentBack>
        <PopupBox>
          <Header>
            <Link
              to="/user"
              state={{ userPost: user }}
              style={{ textDecoration: "none" }}
            >
              <UserContext>
                <CommentorProfile src={user.photo} />
                <Name style={{ marginLeft: "10px" }}>@{user.username}</Name>
                <Status status="#00ff00"></Status>
              </UserContext>
            </Link>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={closeDm}
              style={{
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
              // onClick={() => OpenDM(user)}
            />
          </Header>
          <Messages>
            {messages ? (
              messages.map((message, indx) => (
                <MessageFlexer
                  key={indx}
                  sender={message.sender === userData.uid}
                >
                  <Message sender={message.sender === userData.uid}>
                    {message.description}
                  </Message>
                </MessageFlexer>
              ))
            ) : (
              <p>No messages here</p>
            )}
          </Messages>
          <Footer>
            <ReplyLine>
              <ReplyInput ref={messageText} placeholder="Reply" />
              <FontAwesomeIcon
                onClick={sendMessage}
                style={{ marginRight: "5px", cursor: "pointer" }}
                icon={faPaperPlane}
              />
            </ReplyLine>
          </Footer>
        </PopupBox>
      </TransparentBack>
    </>
  );
};

export default DMPopup;
