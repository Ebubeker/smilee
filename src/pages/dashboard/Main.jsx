import React from "react";
import PostsList from "../../components/posts/PostsList";
import InfoPosts from "../../components/posts/InfoPosts";
import DMSection from "../../components/dm/DMSection";
import { Box, BoxContainer, BoxContainerWrapper } from "./DashboardStyle";

const Main = () => {
  return (
    <Box>
      <BoxContainerWrapper>
        <InfoPosts />
      </BoxContainerWrapper>
      <BoxContainer>
        <PostsList uids={[]} />
      </BoxContainer>
      <BoxContainer dm={true}>
        <DMSection />
      </BoxContainer>
    </Box>
  );
};

export default Main;
