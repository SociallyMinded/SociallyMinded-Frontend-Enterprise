import React from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

export const AddButton = (onClickEvent) => {
  return (
    <StyledEditButton variant="primary" onClick={onClickEvent}>
      Add
    </StyledEditButton>
  );
};

const StyledEditButton = styled(Button)`
  font-family: "Nunito", sans-serif;
  padding: 0.3em;
`;
