import React, { FunctionComponent, useState } from "react";
import { Typography, CircularProgress, Button } from "@material-ui/core";
import { getInformation } from "./contracts/information";
import styled from "styled-components";

interface InformationProps {
  currentBlockNumber: number | undefined;
}

const OpaqueDiv = styled.div`
  position: absolute;
  height: 60px;
  display: block;
  width: 400px;
  background: #ffffffab;
  z-index: 1000;
  text-align: center;
`;

const Loading = () => {
  return <CircularProgress size={10} />;
};

const Information: FunctionComponent<InformationProps> = ({
  currentBlockNumber
}) => {
  const [accountAddress, setAccountAddress] = useState<string>();
  // @ts-ignore
  const cometWallet = window.thor;
  const { loading, currentInformation } = getInformation(
    currentBlockNumber,
    accountAddress
  );

  const getAccountAddress = async () => {
    if (cometWallet) {
      // comet account
      try {
        // @ts-ignore
        const [cometAccount] = await thor.enable();
        setAccountAddress(cometAccount);
      } catch {}
    }
  };

  if (currentBlockNumber && !loading) {
    return (
      <div>
        <Typography variant="caption" gutterBottom align="center">
          Current Pool Size: {currentInformation!.balance} VET
        </Typography>
        <Typography variant="caption" gutterBottom align="center">
          Pool Generation: {currentInformation!.generationRate} VTHOR/day
        </Typography>
        {cometWallet && accountAddress && (
          <>
            <Typography variant="caption" gutterBottom align="center">
              Your share: {currentInformation!.balanceOfUser} VET
            </Typography>
            <Typography variant="caption" gutterBottom align="center">
              Your Generation: {currentInformation!.userGenerationRate}{" "}
              VTHOR/day
            </Typography>
          </>
        )}
        {cometWallet && !accountAddress && (
          <>
            <OpaqueDiv>
              <Button
                size="small"
                variant="contained"
                onClick={getAccountAddress}
                style={{ marginTop: 5 }}
              >
                Show Details
              </Button>
            </OpaqueDiv>
            <Typography variant="caption" gutterBottom align="center">
              Your share: 0 VET
            </Typography>
            <Typography variant="caption" gutterBottom align="center">
              Your Generation: 0 VTHOR/day
            </Typography>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Typography variant="caption" gutterBottom align="center">
          Current Pool Size: <Loading /> VET
        </Typography>
        <Typography variant="caption" gutterBottom align="center">
          Your share: <Loading /> VET
        </Typography>
        {cometWallet && (
          <Typography variant="caption" gutterBottom align="center">
            Pool Generation: <Loading /> VTHOR/day
          </Typography>
        )}
        {cometWallet && (
          <Typography variant="caption" gutterBottom align="center">
            Your Generation: <Loading /> VTHOR/day
          </Typography>
        )}
      </div>
    );
  }
};

export default Information;
