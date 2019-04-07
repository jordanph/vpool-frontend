import React from "react";
import vPoolImage from "./vpool.svg";
import styled from "styled-components";

const Image = styled.img`
  height: 18px;
  margin-right: 10px;
`;

const VPoolImage = () => {
  return <Image src={vPoolImage} />;
};

export default VPoolImage;
