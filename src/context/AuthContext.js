import { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../server/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [profileDetails, setprofileDetails] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        return { uid: user.user.uid };
      }
    );
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateemail = (email) => {
    return updateEmail(currentUser, email);
  };

  const updatepassword = (password) => {
    return updatePassword(currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        onSnapshot(doc(db, "users", user.uid), (snap) => {
          let userData = snap.data();
          userData.uid = user.uid;
          setprofileDetails(userData);
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, "500");
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    profileDetails,
    login,
    signup,
    signout,
    resetPassword,
    updateemail,
    updatepassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
