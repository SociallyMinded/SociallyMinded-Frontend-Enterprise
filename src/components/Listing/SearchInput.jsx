import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { DropdownButton } from "react-bootstrap";
import React from "react";

export const SearchInput = ({ data }) => {
  return (
    <Container>
      <StyledFormControl
        placeholder="Search"
        aria-describedby="basic-addon2"
        onChange={data.searchByProductName}
        value={data.searchQuery}
      />
      <SearchButton onClick={data.performSearch}>Search</SearchButton>
    </Container>
  );
};

const Container = styled.div`
  margin-left: 2%;
  display: flex;
  flex-direction: row;
`;

const StyledFormControl = styled(Form.Control)`
  width: 25vw;
  border-radius: 10px;
`;

const SearchButton = styled(Button)`
  background-color: #2d4696;
  color: #ffffff;
  border: none;
  border-radius: 10px;
`;
