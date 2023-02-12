import React, { useContext, useState, useEffect } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  BackgroundImage,
  ProfileImage,
  ProfileCard,
  Container,
  Status,
  Info,
  StatusInfo,
  StatusCount,
  StatusLabel,
  Name,
  Body,
  LogOutButton,
  Laydown,
  Button,
} from "./settingsStyled";
import Card from "../utils/Card";
import PostsList from "../posts/PostsList";
import ProfileEdit from "./ProfileEdit";
import InfoShower from "./InfoShower";

const ProfileInfo = () => {
  const { userData } = useContext(UserDataContext);
  const [userInfo, setUserInfo] = useState(null);
  const [editUserData, setEditUserData] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const { signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo(userData);
  }, [postsCount]);

  function signOut() {
    signout();
    navigate("/login");
  }

  function openDialogue(e) {
    e.preventDefault();
    setEditUserData(true);
  }

  function closeDialogue() {
    setEditUserData(false);
  }

  function getCount(postsCount) {
    setPostsCount(postsCount);
  }

  if (userInfo) {
    return (
      <>
        <BackgroundImage src={userInfo.backImage} alt="backImage" />
        <Container>
          <InfoShower
            userInfo={userInfo}
            type="current"
            openDialogue={openDialogue}
            signOut={signOut}
          ></InfoShower>
          {/* <Card color="#556772">
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
                  <Button onClick={openDialogue}>Edit Profile</Button>
                </Laydown>
                <Name>{userInfo.nickname}</Name>
                <Body>{userInfo.bio}</Body>
                <PostsList
                  type="profile"
                  getCount={getCount}
                  uids={[userInfo.uid]}
                />
              </Info>
            </ProfileCard>
            <LogOutButton onClick={signOut}>Log out</LogOutButton>
          </Card> */}
        </Container>
        {editUserData && (
          <ProfileEdit currentData={userInfo} close={closeDialogue} />
        )}
      </>
    );
  } else {
    return;
  }
};

export default ProfileInfo;
