import React, { useContext, useEffect, useState, useRef } from "react";
import Card from "../utils/Card";
import { UserDataContext } from "../../context/UserDataContext";
import { uploadImageToStorage } from "../../server/post";
import { getDownloadURL } from "firebase/storage";
import { createPost } from "../../server/post";
import { PostsContext } from "../../context/PostContext";
import { ImageInput, Textarea, PostButton, Title, Form } from "./PostStyled";
import { compressFile } from "../../utils/helpers/smallTweaks";

const CreatePost = () => {
  const { userData } = useContext(UserDataContext);
  const { addPostToTheContext } = useContext(PostsContext);

  const [userInfo, setUserInfo] = useState({});

  // PostingContent
  const [imageUpload, setImageUpload] = useState(null);
  const projectDescription = useRef(null);

  function createAPost(e) {
    e.preventDefault();
    if (imageUpload !== null && projectDescription) {
      compressFile(imageUpload).then((imageData) => {
        uploadImageToStorage(imageData).then((data) => {
          getDownloadURL(data.reference).then((url) => {
            createPost(url, projectDescription.current.value, userInfo.uid)
              .then(() => {
                addPostToTheContext(
                  url,
                  projectDescription.current.value,
                  userInfo.uid
                );
                projectDescription.current.value = "";
                setImageUpload(null);
              })
              .catch((err) => console.log(err));
          });
        });
      });
    }
  }

  useEffect(() => {
    setUserInfo(userData);
  }, [userData]);

  return (
    <Card>
      <Title>Share A Post</Title>
      <Form onSubmit={createAPost}>
        <ImageInput
          type="file"
          onChange={(event) => setImageUpload(event.target.files[0])}
        />
        <Textarea
          rows="10"
          placeholder="Share Smth..."
          ref={projectDescription}
        ></Textarea>
        <PostButton>Share Post</PostButton>
      </Form>
    </Card>
  );
};

export default CreatePost;
