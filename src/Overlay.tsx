import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const OpaqueDiv = styled.div`
  position: absolute;
  height: 333px;
  display: block;
  width: 500px;
  background: #ffffffab;
  z-index: 1000;
  text-align: center;
`;

const Overlay = () => {
  return (
    <OpaqueDiv>
      <CircularProgress size={80} style={{ position: "relative", top: 130 }} />
    </OpaqueDiv>
  );
};

export default Overlay;
