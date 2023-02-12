import React, { useRef, useEffect, useState } from "react";
import {
  Overlay,
  Dialogue,
  DialogueTitle,
  Form,
  InputLabel,
  Input,
  Field,
  TextArea,
  Xmark,
  DialogueHeader,
  SubmitButton,
} from "./settingsStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  updateUserInformation,
  uploadUserImageToStorage,
} from "../../server/user";
import { getDownloadURL } from "firebase/storage";
import { compressProfileImageFile } from "../../utils/helpers/smallTweaks";

const ProfileEdit = ({ currentData, close }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileBackground, setProfileBackground] = useState(null);
  const username = useRef(null);
  const nickname = useRef(null);
  const bio = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);
  const email = useRef(null);
  const date = useRef(null);

  useEffect(() => {
    username.current.value = currentData.username;
    nickname.current.value = currentData.nickname;
    bio.current.value = currentData.bio;
    firstname.current.value = currentData.firstName;
    lastname.current.value = currentData.lastName;
    email.current.value = currentData.email;
    date.current.value = currentData.birthday;
  }, []);

  function updateUserData(image, backImage) {
    if (
      (username.current.value,
      firstname.current.value,
      lastname.current.value,
      email.current.value)
    ) {
      let data = {
        username: username.current.value,
        nickname: nickname.current.value,
        bio: bio.current.value,
        firstName: firstname.current.value,
        lastName: lastname.current.value,
        email: email.current.value,
        birthday: date.current.value,
      };
      if (image && backImage) {
        data = {
          ...data,
          photo: image,
          backImage: backImage,
        };
      } else if (image) {
        data = {
          ...data,
          photo: image,
        };
      } else if (backImage) {
        data = {
          ...data,
          backImage: backImage,
        };
      }
      updateUserInformation(data, currentData.uid).then(() =>
        window.location.reload(true)
      );
    }
  }

  function updateUser(e) {
    e.preventDefault();

    if (profileImage && profileBackground) {
      compressProfileImageFile(profileImage).then((profImage) => {
        uploadUserImageToStorage(profImage).then((data) => {
          getDownloadURL(data.reference).then((url) => {
            const image = url;
            compressProfileImageFile(profileBackground).then(
              (profBackImage) => {
                uploadUserImageToStorage(profBackImage).then((data) => {
                  getDownloadURL(data.reference).then((url) => {
                    const backImage = url;
                    updateUserData(image, backImage);
                  });
                });
              }
            );
          });
        });
      });
    } else if (profileImage) {
      compressProfileImageFile(profileImage).then((profImage) => {
        uploadUserImageToStorage(profImage).then((data) => {
          getDownloadURL(data.reference).then((url) => {
            const image = url;
            updateUserData(image, null);
          });
        });
      });
    } else if (profileBackground) {
      compressProfileImageFile(profileImage).then((profImage) => {
        uploadUserImageToStorage(profImage).then((data) => {
          getDownloadURL(data.reference).then((url) => {
            const backImage = url;
            updateUserData(null, backImage);
          });
        });
      });
    } else {
      updateUserData(null, null);
    }
  }

  return (
    <Overlay>
      <Dialogue>
        <DialogueHeader>
          <Xmark onClick={close}>
            <FontAwesomeIcon icon={faXmark} />
          </Xmark>
          <DialogueTitle>Edit Profile</DialogueTitle>
        </DialogueHeader>
        <Form onSubmit={updateUser}>
          <Field>
            <InputLabel>Profile Photo</InputLabel>
            <Input
              onChange={(event) => setProfileImage(event.target.files[0])}
              type="file"
            />
          </Field>
          <Field>
            <InputLabel>Background Photo</InputLabel>
            <Input
              onChange={(event) => setProfileBackground(event.target.files[0])}
              type="file"
            />
          </Field>
          <Field>
            <InputLabel>Username</InputLabel>
            <Input ref={username} type="text" placeholder="Username..." />
          </Field>
          <Field>
            <InputLabel>Nickname</InputLabel>
            <Input ref={nickname} type="text" placeholder="Nickname..." />
          </Field>
          <Field>
            <InputLabel>Bio</InputLabel>
            <TextArea ref={bio} />
          </Field>
          <Field>
            <InputLabel>Firstname</InputLabel>
            <Input ref={firstname} type="text" placeholder="Firstname..." />
          </Field>
          <Field>
            <InputLabel>Lastname</InputLabel>
            <Input ref={lastname} type="text" placeholder="Lastname..." />
          </Field>
          <Field>
            <InputLabel>Email</InputLabel>
            <Input ref={email} type="email" placeholder="Email..." />
          </Field>
          <Field>
            <InputLabel>Birthday</InputLabel>
            <Input ref={date} type="date" />
          </Field>
          <SubmitButton>Update User</SubmitButton>
        </Form>
      </Dialogue>
    </Overlay>
  );
};

export default ProfileEdit;
