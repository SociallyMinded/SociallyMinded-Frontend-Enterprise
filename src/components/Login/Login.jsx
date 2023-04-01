import React from "react";
import { PageTemplate } from "../common/styles";
import useLoginHooks from "./loginHooks";

import Button from "react-bootstrap/Button";
import SiteLogo from "../common/SiteLogo/SiteLogo";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { SIGNUP_PAGE_LINK } from "../../routes/routes";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { RESET_PASSWORD_LINK } from "../../routes/routes";

const Login = () => {
  const { state, setState } = useLoginHooks();

  return (
    <PageTemplate>
      <SiteLogo></SiteLogo>
      <ResetPasswordPageTemplate>
        <FormResultTemplate>
          {state.showPageLoadSpinner && <Spinner animation="border" />}
          {state.showErrorWarning && (
            <Alert
              variant={"danger"}
              onClose={setState.handleShowErrorWarning}
              dismissible
            >
              {state.serverError}
            </Alert>
          )}
        </FormResultTemplate>

        <h1>Log in</h1>

        <Form onSubmit={setState.loginToAccount}>
          <FormInputContainer>
            <FormLabel>Email</FormLabel>
            <FormInput
              required
              type="text"
              value={state.email}
              onChange={setState.handleEmailChange}
            />
          </FormInputContainer>

          <FormInputContainer>
            <FormLabel>Password</FormLabel>
            <FormInput
              required
              type="password"
              value={state.password}
              onChange={setState.handlePasswordChange}
            />
          </FormInputContainer>
          {(state.email.length == 0 || state.password.length == 0) && (
            <FormButton disabled type="submit">
              Log in
            </FormButton>
          )}
          {state.email.length != 0 && state.password.length != 0 && (
            <FormButton type="submit">Log in</FormButton>
          )}
          <GoogleButton onClick={setState.signInViaGoogle}>
            <LogoImage src={require("./google.png")}></LogoImage>
            Continue with Google
          </GoogleButton>
        </Form>
        <SignupPageLink to={SIGNUP_PAGE_LINK}>Sign Up</SignupPageLink>
        <HomeLink to={RESET_PASSWORD_LINK}>Reset Password</HomeLink>
      </ResetPasswordPageTemplate>
    </PageTemplate>
  );
};

const FormResultTemplate = styled.div`
  height: 13vh;
`;

const ResetPasswordPageTemplate = styled.div`
  display: flex;
  margin-bottom: 15%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30%;
`;
const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-width: 0px;
  margin-top: 2%;
  margin-bottom: 2%;
`;

const FormLabel = styled.label`
  font-size: 0.9em;
`;

const FormInput = styled.input`
  height: 35px;
  border-radius: 5px;
  outline: none;
  outline: none;
  box-shadow: none;
  border: 1px solid #c9c9c9;
`;

const FormDescription = styled.p`
  margin-top: 3%;
  margin-bottom: 7%;
`;

const FormButton = styled(Button)`
  height: 35px;
  margin-top: 4%;
  font-family: Nunito;
  background-color: #2d4696;
  &:hover {
    background-color: #34b8fe;
    border-color: #34b8fe;
  }
`;

const GoogleButton = styled(Button)`
  height: 35px;
  margin-top: 4%;
  background: white;
  color: black;
  font-family: Nunito;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  &:hover {
    background-color: #ededed;
    border: 1px solid #c9c9c9;
    color: black;
  }
`;

const SignupPageLink = styled(Link)`
  margin-top: 1.5em;
  text-decoration: none;
`;

const LogoImage = styled.img`
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
`;
const HomeLink = styled(Link)`
  margin-top: 1.5em;
  text-decoration: none;
`;

export default Login;
