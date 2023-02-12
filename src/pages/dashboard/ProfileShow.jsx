import React from "react";
import ProfileShower from "../../components/settings/ProfileShower";
import { useLocation } from "react-router-dom";

const ProfileShow = () => {
  const location = useLocation();
  const { userPost } = location.state;
  return (
    <>
      <ProfileShower current={userPost} />
    </>
  );
};

export default ProfileShow;
