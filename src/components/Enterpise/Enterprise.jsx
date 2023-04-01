import useEnterpriseHooks from "./enterpriseHooks";
import styled from "styled-components";
import { SubmitButton } from "../common/Button/SubmitButton";
import { DeleteButton } from "../common/Button/DeleteButton";
import { EditButton } from "../common/Button/EditButton";
import { PageTemplate } from "../common/styles";
import { UserAuth } from "../../context/AuthContext";
import LoggedInHeader from "../common/Header/LoggedInHeader";

export const Enterprise = () => {
  const {
    data,
    error,
    loading,
    showEnterprises,
    toggleShowEnterprises,
    input,
    handleInput,
    response,
    handlers,
  } = useEnterpriseHooks();

  const { user } = UserAuth();

  // console.log(user.uid)
  // console.log(user.displayName)
  // console.log(user.email)

  return (
    <PageTemplate>
      <LoggedInHeader></LoggedInHeader>
    </PageTemplate>
  );
};
