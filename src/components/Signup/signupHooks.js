import axios from "axios";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAllEnterprisesUrl, handleLoginViaGmail } from "../../routes/routes";
import {
  PASSWORD_INSUFFICIENT_LEN_ERROR,
  newEnterpriseRecord,
  GENERIC_EMAIL_ERROR,
  EMAIL_ALREADY_EXISTS,
} from "./signupConstants";

import { GoogleAuthProvider } from "firebase/auth";

const useSignupHooks = () => {
  const { createUser, setCurrentUserDetail, signInWithGmailPopup } = UserAuth();
  const navigate = useNavigate();

  const [enterpriseName, setEnterpriseName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const [showErrorWarning, setShowErrorWarning] = useState(false);
  const [showPageLoadSpinner, setShowPageLoadSpinner] = useState(false);

  const handleShowErrorWarning = (event) => {
    setShowErrorWarning(!showErrorWarning);
  };

  const handleEnterpriseNameChange = (event) => {
    setEnterpriseName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    if (event.target.value.length < 6) {
      setPasswordError(PASSWORD_INSUFFICIENT_LEN_ERROR);
    } else {
      setPasswordError("");
    }
  };

  const signInViaGoogle = async () => {
    try {
      await signInWithGmailPopup()
        .then((result) => {
          console.log(result);
          const user = result.user;
          const newRecord = newEnterpriseRecord(
            user.displayName,
            user.displayName,
            user.email,
            user.uid
          );
          return axios.put(handleLoginViaGmail, newRecord);
        })
        .then((result) => {
          console.log(result);
          navigate("/Home");
        });
    } catch (error) {
      setServerError(error.response.data.message);
      setShowErrorWarning(true);
    } finally {
      console.log("Done");
    }
  };

  const handleFormSignup = async (event) => {
    setShowErrorWarning(false);
    event.preventDefault();
    try {
      setShowPageLoadSpinner(true);
      await createUser(email, password)
        .then((result) => {
          const user = result.user;
          const newRecord = newEnterpriseRecord(
            enterpriseName,
            username,
            email,
            user.uid
          );
          return axios.post(getAllEnterprisesUrl, newRecord);
        })
        .then((result) => {
          console.log(result);
          navigate("/Home");
        });
    } catch (error) {
      setShowErrorWarning(true);
      if (error.code == "auth/email-already-in-use") {
        setServerError(EMAIL_ALREADY_EXISTS);
      } else {
        setServerError(GENERIC_EMAIL_ERROR);
      }
    } finally {
      setShowPageLoadSpinner(false);
      console.log("Done");
    }
  };

  const state = {
    username,
    email,
    password,
    passwordError,
    serverError,
    showErrorWarning,
    showPageLoadSpinner,
  };

  const setState = {
    handleEnterpriseNameChange,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleFormSignup,
    signInViaGoogle,
    handleShowErrorWarning,
  };

  return { state, setState };
};

export default useSignupHooks;
