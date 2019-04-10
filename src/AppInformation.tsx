import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";

const HoverButton = styled(({ ...props }) => <Button {...props} />)`
  &&:hover {
    cursor: help;
  }
`;

const AppInformation = () => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        aria-label="Information"
        variant="extended"
        style={{ position: "fixed", right: 20, bottom: 20 }}
        onClick={onClick}
      >
        Information
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        style={{ textAlign: "center", padding: 50 }}
      >
        <div
          style={{
            width: 400,
            outline: "none",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <Paper style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
              Information
            </Typography>

            <Typography
              variant="body1"
              gutterBottom
              style={{ marginBottom: 20 }}
            >
              VePool is a fully decentralised staking service that allows a user
              to deposit their VET and have their generated THOR automatically
              converted back into VET. By staking your VET in the pool, you also
              generate the bonus THOR if the pool reaches one of the masternode
              levels. In VePool only the user can ever touch their VET. VePool
              is always transparent and will only ask for the user's public
              address when it is needed. This is a system where the user always
              remains in control.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Features
            </Typography>

            <Tooltip title="By depositing your VET into the smart contract, any THOR that is generated, is automatically converted back into VET. This means that you can accrue compound interest without the worry of always sending your THOR to an exchange.">
              <HoverButton
                size="small"
                variant="contained"
                color="primary"
                style={{ marginBottom: 20 }}
                fullWidth
              >
                Automatic conversion of THOR back into VET
              </HoverButton>
            </Tooltip>

            <Tooltip title="Once the pool reaches a masternode threshold, you'll be able to tap into the bonus THOR that is generated! Meaning more VET back into your pocket.">
              <HoverButton
                size="small"
                variant="contained"
                color="primary"
                style={{ marginBottom: 20 }}
                fullWidth
              >
                Bonus THOR generation
              </HoverButton>
            </Tooltip>

            <Tooltip title="VePool is, and always will be, a free service. There are no fees for using the service. The automatic conversion is done using the THOR within the contract, meaning the small gas fee is paid by everyone within the pool (completely negliable to the everyday user!).">
              <HoverButton
                size="small"
                variant="contained"
                color="primary"
                style={{ marginBottom: 20 }}
                fullWidth
              >
                Feeless
              </HoverButton>
            </Tooltip>

            <Typography variant="h6" gutterBottom>
              How to use
            </Typography>

            <List dense={true}>
              <ListItem>
                <ListItemText primary="1. Deposit your VET" />
              </ListItem>
              <ListItem>
                <ListItemText primary="2. Accrue interest back into VET" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3. Withdraw or deposit more VET at any time" />
              </ListItem>
            </List>

            <Typography variant="caption" gutterBottom>
              Important Note: Although testing has been performed, VePool is
              still in an alpha stage. Please be cautious when using the service
              and try to deposit smaller amounts. We hope to release the Beta
              version soon!
            </Typography>
          </Paper>
        </div>
      </Modal>
    </>
  );
};

export default AppInformation;
