import React, { createContext, useState, useEffect } from "react";

export const UserLoginContext = createContext({
  isLoggedIn: {},
  auth: [],
  changeAuthStatus: () => {},
});

const UserLoginProdvider = ({ children }) => {
  let [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [auth, setAuth] = useState({ isLoggedIn: false });

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("userDetails")));
    if (localStorage.getItem("userDetails") != null) {
      setAuth({ isLoggedIn: true });
    }
  }, []);

  setInterval(() => {
    if (
      localStorage.getItem("userDetails") == null &&
      auth.isLoggedIn === true
    ) {
      setAuth({ isLoggedIn: false });
    }
  }, 5000);

  const changeAuthStatus = (status) => {
    setAuth({ isLoggedIn: status });
  };

  return (
    <UserLoginContext.Provider
      value={{
        isLoggedIn,
        auth,
        changeAuthStatus,
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};

export default UserLoginProdvider;
