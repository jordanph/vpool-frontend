import React from "react";
import styled from "styled-components";

const Badge = styled.span`
  color: white;
  background-color: #3f51b5;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 0.725rem;
  position: absolute;
  margin-top: 5px;
  margin-left: 5px;
`;

const AlphaBadge = () => <Badge>ALPHA</Badge>;

export default AlphaBadge;
