import React from "react";
import { AuthProvider } from "./AuthContext";
import { PostProvider } from "./PostContext";
import { UserDataProvider } from "./UserDataContext";
import { DocumentCountProvider } from "./DocumentCountContext";

const ProviderLayout = ({ children }) => {
  return (
    <AuthProvider>
      <PostProvider>
        <UserDataProvider>
          <DocumentCountProvider>{children}</DocumentCountProvider>
        </UserDataProvider>
      </PostProvider>
    </AuthProvider>
  );
};

export default ProviderLayout;
