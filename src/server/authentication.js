import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";

export function validateData(data, type) {
  if (type === "login") {
  } else {
    // eslint-disable-next-line no-unused-vars
    for (const key in data) {
      if (data[key] === "" || data[key] === null || data[key] === undefined) {
        return {
          error: "Please make sure to fill all the fields!",
        };
      }
    }
    if (
      data.email !== data.confirmEmail ||
      data.password !== data.confirmPassword
    ) {
      return {
        error:
          "Please make sure that your Email Confirmation or Password Confirmation are the same",
      };
    }

    return {
      data: data,
    };
  }
}

export async function createAccount(data, uid) {
  await setDoc(doc(db, "users", uid), {
    ...data.data,
    following: [],
    followers: [],
    bio: "",
    backImage:
      "https://firebasestorage.googleapis.com/v0/b/smilee-83d61.appspot.com/o/userPhotos%2Fezgif.com-gif-maker.jpg?alt=media&token=7ffe2c46-e4fc-4da1-bfa1-c3005d49ff7e",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/smilee-83d61.appspot.com/o/userPhotos%2F360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg?alt=media&token=6eb15316-5b3e-4a50-b3fa-3e002696536d",
    nickname: "",
  });
}
