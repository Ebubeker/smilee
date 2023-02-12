import React, { useContext, useEffect, useState } from "react";
import Card from "../utils/Card";
import { UserDataContext } from "../../context/UserDataContext";
import { getUsersIFollow } from "../../server/user";
import {
  User,
  UserContext,
  CommentorProfile,
  Name,
  Status,
  Title,
} from "./DMStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faMessage as filledFaMessage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DMPopup from "./DMPopup";

const DMSection = () => {
  const { userData } = useContext(UserDataContext);
  const [usersList, setUsersList] = useState(null);
  const [DMOppened, setDMOppened] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsersIFollow(userData.following).then((data) => {
      setUsersList(data);
    });
  }, []);

  function OpenDM(user) {
    setDMOppened(false);
    setSelectedUser(user);
    setDMOppened(true);
  }

  function closeDm(user) {
    setSelectedUser(null);
    setDMOppened(false);
  }

  return (
    <>
      <Card>
        <Title>DM Section</Title>
        {usersList &&
          usersList.map((user) => {
            if (user.uid !== userData.uid) {
              return (
                <User key={user.username}>
                  <Link
                    to="/user"
                    state={{ userPost: user }}
                    style={{ textDecoration: "none" }}
                  >
                    <UserContext>
                      <CommentorProfile src={user.photo} />
                      <Name style={{ marginLeft: "10px" }}>
                        @{user.username}
                      </Name>
                      <Status status="#00ff00"></Status>
                    </UserContext>
                  </Link>
                  <FontAwesomeIcon
                    icon={selectedUser === user ? filledFaMessage : faMessage}
                    style={{
                      color: "white",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => OpenDM(user)}
                  />
                </User>
              );
            }
          })}
      </Card>
      {DMOppened && selectedUser && (
        <DMPopup closeDm={closeDm} user={selectedUser} />
      )}
    </>
  );
};

export default DMSection;
