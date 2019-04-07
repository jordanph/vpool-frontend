import React, { FunctionComponent, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { getInformation } from "./contracts/information";

interface InformationProps {
  currentBlockNumber: number | undefined;
}

const Information: FunctionComponent<InformationProps> = ({
  currentBlockNumber
}) => {
  if (currentBlockNumber) {
    const { loading, currentInformation } = getInformation(currentBlockNumber);

    useEffect(() => {}, [currentBlockNumber]);

    return (
      <div>
        <Typography variant="caption" gutterBottom align="center">
          Current Pool Size: {!loading && currentInformation!.balance}
          VET
        </Typography>
        <Typography variant="caption" gutterBottom align="center">
          Your share: 1111 VET
        </Typography>
        <Typography variant="caption" gutterBottom align="center">
          Pool Generation: 124124 VTHOR/day
        </Typography>
        <Typography variant="caption" gutterBottom align="center">
          Your Generation: 1234 VTHOR/day
        </Typography>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Information;
