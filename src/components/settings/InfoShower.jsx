import React, { useState, useContext } from "react";
import Card from "../utils/Card";
import {
  ProfileImage,
  ProfileCard,
  Status,
  StatusInfo,
  StatusCount,
  StatusLabel,
  Info,
  Laydown,
  Name,
  Button,
  Body,
  LogOutButton,
} from "./settingsStyled";
import PostsList from "../posts/PostsList";
import { UserDataContext } from "../../context/UserDataContext";

const InfoShower = ({ userInfo, type, openDialogue, signOut }) => {
  const [postsCount, setPostsCount] = useState(0);
  const { userData, updateFollowList } = useContext(UserDataContext);

  function getTheCount(postsCount) {
    setPostsCount(postsCount);
  }

  function updateRelations(user) {
    if (userData.following.includes(user.uid)) {
      updateFollowList(user.uid, "unfollow");
    } else {
      updateFollowList(user.uid, "follow");
    }
  }

  return (
    <Card color="#556772">
      <ProfileImage src={userInfo.photo} alt="profilePicture" />
      <ProfileCard>
        <Status>
          <StatusInfo>
            <StatusCount>{postsCount}</StatusCount>
            <StatusLabel>Posts</StatusLabel>
          </StatusInfo>
          <StatusInfo>
            <StatusCount>{userInfo.followers.length}</StatusCount>
            <StatusLabel>Followers</StatusLabel>
          </StatusInfo>
          <StatusInfo>
            <StatusCount>{userInfo.following.length}</StatusCount>
            <StatusLabel>Following</StatusLabel>
          </StatusInfo>
        </Status>
        <Info>
          <Laydown>
            <Name>@{userInfo.username}</Name>
            {type === "current" || userInfo.uid === userData.uid ? (
              <Button onClick={openDialogue}>Edit Profile</Button>
            ) : (
              <Button onClick={() => updateRelations(userInfo)}>
                {!userData.following.includes(userInfo.uid)
                  ? "Follow"
                  : "Unfollow"}
              </Button>
            )}
          </Laydown>
          <Name>{userInfo.nickname}</Name>
          <Body>{userInfo.bio}</Body>
          <PostsList
            type="profile"
            getCount={getTheCount}
            uids={[userInfo.uid]}
          />
        </Info>
      </ProfileCard>
      {type === "current" && (
        <LogOutButton onClick={signOut}>Log out</LogOutButton>
      )}
    </Card>
  );
};

export default InfoShower;
