import React from "react";
import PostsList from "../../components/posts/PostsList";
import InfoPosts from "../../components/posts/InfoPosts";
import DMSection from "../../components/dm/DMSection";
import { Box, BoxContainer } from "./DashboardStyle";

const Main = () => {
  return (
    <Box>
      <BoxContainer>
        <InfoPosts />
      </BoxContainer>
      <BoxContainer>
        <PostsList uids={[]} />
      </BoxContainer>
      <BoxContainer>
        <DMSection />
      </BoxContainer>
    </Box>
  );
};

export default Main;
