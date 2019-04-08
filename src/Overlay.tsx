import React from "react";
import styled from "styled-components";

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
  return <OpaqueDiv />;
};

export default Overlay;
