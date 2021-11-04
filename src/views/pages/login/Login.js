import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { UserLoginContext } from "../../../context-providers/user-login-context";
import { parseJSON } from "date-fns";

const Login = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const { auth, changeAuthStatus } = useContext(UserLoginContext);
  const [authError, setAuthError] = useState({ errorStatus: false });

  const saveTokenInLocalStorage = (data) => {
    if (data == undefined) return;
    localStorage.setItem("userDetails", JSON.stringify(data.data.data));
  };

  const handleSubmit = () => {
    if (
      email == undefined ||
      email === "" ||
      password == undefined ||
      password === ""
    )
      return;

    let postData = {
      email: `${email}`,
      password: `${password}`,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    };

    axios
      .post(
        "https://vegasapi.phebsoft-team.com/api/login",
        postData,
        axiosConfig
      )
      .then((result) => {
        if (result.data.data.status === true) {
          setAuthError({ errorStatus: false });
          saveTokenInLocalStorage(result);
          changeAuthStatus(true);
        } else if (result.data.data.status === false) {
          setAuthError({
            errorStatus: true,
            errorMessage: result.data.data.message,
          });
        }
      })
      .catch((error) => console.log(parseJSON(error), "whats is the errror"));
  };
  if (auth.isLoggedIn === true) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    {authError.errorStatus === true && (
                      <small style={{ color: "red", marginBottom: "10px" }}>
                        {authError.errorMessage}
                      </small>
                    )}
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleSubmit}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
