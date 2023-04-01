import React from "react";
import SiteLogo from "../SiteLogo/SiteLogo";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { DASHBOARD_LINK, HOME_LINK } from "../../../routes/routes";

const LoggedInHeader = () => {
  return (
    <HeaderLinkContainer>
      <SiteLogo></SiteLogo>
      <HeaderSiteLinks>
        <HeaderLink to={DASHBOARD_LINK}>Dashboard</HeaderLink>
        <HeaderLink>Data</HeaderLink>
        <HeaderLink>Listings</HeaderLink>
        <HeaderLink>Storefront</HeaderLink>
        <HeaderLink to={HOME_LINK}>Log Out</HeaderLink>
      </HeaderSiteLinks>
    </HeaderLinkContainer>
  );
};

const HeaderLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderSiteLinks = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 35%;
  margin-top: 0.5em;
  width: 100%;
`;
const HeaderLink = styled(Link)`
  margin-right: 10%;
  font-size: 1.1em;
  text-decoration: none;
  color: black;
  position: relative;

  &:hover {
    color: #2d4696;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    border-radius: 4px;
    background-color: #2d4696;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
`;

export default LoggedInHeader;
