import { Link } from "react-router-dom";
import { LOGIN_PAGE_LINK, RESET_PASSWORD_LINK } from "../../routes/routes";
import useSignupHooks from "./signupHooks";
import styled from "styled-components";
import { PageTemplate } from "../common/styles";
import Button from "react-bootstrap/Button";
import SiteLogo from "../common/SiteLogo/SiteLogo";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import PasswordStrengthBar from 'react-password-strength-bar';

const Signup = () => {
  const { state, setState } = useSignupHooks();

  return (
    <PageTemplate>
      <SiteLogo></SiteLogo>
      <SignupPageTemplate>
        <FormResultTemplate>
          {state.showPageLoadSpinner && <Spinner animation="border" />}

          {state.showErrorWarning && (
            <Alert
              variant={"danger"}              
            >
              {state.serverError}
            </Alert>
          )}
        </FormResultTemplate>

        <h1>Sign up</h1>

        <Form onSubmit={setState.handleFormSignup}>
          <FormInputContainer>
            <FormLabel>Enterprise Name</FormLabel>
            <FormInput
              required
              type="text"
              value={state.enterpriseName}
              onChange={setState.handleEnterpriseNameChange}
            />
          </FormInputContainer>

          <FormInputContainer>
            <FormLabel>Username</FormLabel>
            <FormInput
              required
              type="text"
              value={state.username}
              onChange={setState.handleUsernameChange}
            />
          </FormInputContainer>

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
            <ErrorText>{state.passwordError}</ErrorText>
            <PasswordStrengthBar password={state.password} />

          </FormInputContainer>
          {state.email.length != 0 &&
            state.username.length != 0 &&
            state.password.length >= 6 && (
              <FormButton type="submit">Sign Up</FormButton>
            )}
          {(state.email.length == 0 ||
            state.password.length < 6 ||
            state.username.length == 0) && (
            <FormButton disabled type="submit">
              Sign Up
            </FormButton>
          )}
          <GoogleButton onClick={setState.signInViaGoogle}>
            <LogoImage src={require("./google.png")}></LogoImage>
            Continue with google
          </GoogleButton>
        </Form>
        <LoginLink to={LOGIN_PAGE_LINK}>Log in</LoginLink>
      </SignupPageTemplate>
    </PageTemplate>
  );
};

const ErrorText = styled.p`
    color:red;
    font-size:0.9em;
`

const FormResultTemplate = styled.div`
  height: 13vh;
`;

const SignupPageTemplate = styled.div`
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
`;

const FormLabel = styled.label`
  font-size: 0.9em;
`;

const FormInput = styled.input`
  border-radius: 5px;
  padding: 0.5em;
  outline: none;
  outline: none;
  box-shadow: none;
  border: 1px solid #c9c9c9;
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

const LogoImage = styled.img`
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
`;

const LoginLink = styled(Link)`
  margin-top: 1.5em;
  text-decoration: none;
`;
export default Signup;
