import React from "react";
import { Typography } from "@material-ui/core";
import AlphaBadge from "./AlphaBadge";
import styled from "styled-components";
import VPoolImage from "./images/VPoolImage";

const HeaderDiv = styled.div`
  width: 500px;
  margin: 20px auto;
  padding: 10px;
`;

const HeaderTypographyStyles = {
  color: "rgb(123, 123, 123)",
  paddingLeft: 20
};

const Header = () => {
  return (
    <HeaderDiv>
      <Typography variant="h5" gutterBottom style={HeaderTypographyStyles}>
        <VPoolImage />
        <span>
          V-POOL <AlphaBadge />
        </span>
      </Typography>
    </HeaderDiv>
  );
};

export default Header;
