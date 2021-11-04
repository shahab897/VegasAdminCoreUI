import React, { useContext, useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { withRouter } from "react-router-dom";
import { UserLoginContext } from "../context-providers/user-login-context";

const TheLayout = ({ history }) => {
  const { auth } = useContext(UserLoginContext);
  useEffect(() => {
    if (
      auth.isLoggedIn === false ||
      localStorage.getItem("userDetails") == null
    ) {
      history.push("/login");
    }
  }, [auth]);
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default withRouter(TheLayout);
