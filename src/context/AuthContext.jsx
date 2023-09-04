import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../fireabase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  //   singup function
  async function singup(email, password, username) {
    await createUserWithEmailAndPassword(auth, email, password);

    //  update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }
  // login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // logout
  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    loading,
    setLoading,
    singup,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
