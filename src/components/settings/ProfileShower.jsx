import React from "react";
import { BackgroundImage, Container } from "./settingsStyled";
import InfoShower from "./InfoShower";

const ProfileShower = ({ current }) => {
  return (
    <>
      <BackgroundImage src={current.backImage} alt="backImage" />
      <Container>
        <InfoShower userInfo={current} type="other" />
      </Container>
    </>
  );
};

export default ProfileShower;
