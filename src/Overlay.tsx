import React from "react";
import styled from "styled-components";
import { Grid, Paper, Link, Typography } from "@material-ui/core";
import SyncImage from "./images/sync.png";
import CometImage from "./images/comet.png";

const OpaqueDiv = styled.div`
  position: absolute;
  height: 333px;
  display: block;
  width: 450px;
  background: #ffffffab;
  z-index: 1000;
  text-align: center;
  padding: 30px;
`;

const Overlay = () => {
  return (
    <OpaqueDiv>
      <Grid container spacing={24} justify="center">
        <Grid item xs={10}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="caption">
              In order to connect to the Vechain network and use VePool, please
              install one of the following:
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: 20 }}>
            <Link href={"https://env.vechain.org/#sync"}>
              <img src={SyncImage} style={{ height: 120, marginBottom: 10 }} />
              <br />
              Sync
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: 20 }}>
            <Link href={"https://www.cometpowered.com/"}>
              <img src={CometImage} style={{ height: 120, marginBottom: 10 }} />
              <br />
              Comet
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </OpaqueDiv>
  );
};

export default Overlay;
