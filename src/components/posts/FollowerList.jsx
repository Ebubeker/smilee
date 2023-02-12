import React, { useEffect, useState, useContext } from "react";
import { getNewUsers } from "../../server/user";
import { UserDataContext } from "../../context/UserDataContext";
import {
  User,
  CommentorProfile,
  Name,
  FollowButton,
  UserContext,
  Title,
} from "./PostStyled";

const FollowerList = () => {
  const { userData, updateFollowList } = useContext(UserDataContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getNewUsers(userData.following).then((data) => {
      setUsers(data);
    });
  }, []);

  function updateRelations(user) {
    if (userData.following.includes(user.uid)) {
      updateFollowList(user.uid, "unfollow");
    } else {
      updateFollowList(user.uid, "follow");
    }
  }

  return (
    <>
      <Title>You may know...</Title>
      {users.map((user) => {
        if (user.username !== userData.username) {
          return (
            <User key={user.username}>
              <UserContext>
                <CommentorProfile src={user.photo} />
                <Name style={{ marginLeft: "10px" }}>@{user.username}</Name>
              </UserContext>
              <FollowButton onClick={() => updateRelations(user)}>
                {!userData.following.includes(user.uid) ? "Follow" : "Unfollow"}
              </FollowButton>
            </User>
          );
        }
      })}
    </>
  );
};

export default FollowerList;
