import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HOME_LINK } from "../../../routes/routes";

const SiteLogo = () => {
  return (
    <SiteLogoStyled>
      <SiteLogoDescription to={HOME_LINK}>SociallyMinded</SiteLogoDescription>
    </SiteLogoStyled>
  );
};

const SiteLogoStyled = styled.div`
  display: flex;
  flex-direction: row;
`;
const SiteLogoDescription = styled(Link)`
  font-size: 1.5em;
  text-decoration: none;
  color: #2d4696;
  &:hover {
    color: #34b8fe;
  }
`;

export default SiteLogo;
