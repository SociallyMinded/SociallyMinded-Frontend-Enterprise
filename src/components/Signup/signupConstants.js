export const PASSWORD_INSUFFICIENT_LEN_ERROR =
  "Password should be at least 6 characters";
export const EMAIL_ALREADY_EXISTS =
  "There is already an account with this email";
export const GENERIC_EMAIL_ERROR = "Invalid Email";

export const newEnterpriseRecord = (
  enterpriseName,
  username,
  email,
  firebaseUid
) => {
  return {
    enterpriseName: enterpriseName,
    username: username,
    email: email,
    firebaseUid: firebaseUid,
  };
};
