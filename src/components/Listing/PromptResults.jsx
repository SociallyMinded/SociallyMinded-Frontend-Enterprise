import styled from "styled-components";
import React from "react";

export const PromptResults = ({ data }) => {
  return (
    <StyledPromptResultsContainer>
      {data.showSearchPrompts &&
        data.searchPrompts != "" &&
        data.searchPrompts.map((prompt) => (
          <StyledPromptResults
            value={prompt}
            onClick={() => data.handleSearchQuery(prompt)}
          >
            {prompt}
          </StyledPromptResults>
        ))}
    </StyledPromptResultsContainer>
  );
};

const StyledPromptResults = styled.p`
  padding-left: 1.5em;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  &:hover {
    background-color: #ebebeb;
  }
  margin: 0;
`;

const StyledPromptResultsContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  position: absolute;
  opacity: 1;
  overflow-y: scroll;
  max-height: 30vh;
  z-index: 2;
  width: 25%;
  box-shadow: 0 1px 10px rgb(0 0 0 / 0.2);
  top: 18vh;
  margin-left: 7.2vw;
`;
