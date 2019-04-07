import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import { Typography } from "@material-ui/core";
import Header from "./Header";

const App = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (_: any, value: number) => {
    setTab(value);
  };

  return (
    <div>
      <Header />
      <div
        className="App"
        style={{
          width: 500,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Paper
          square
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            <Tab label="Deposit" />
            <Tab label="Withdraw" />
            <Tab label="Convert" disabled />
          </Tabs>
          <div style={{ padding: 20, width: "80%" }}>
            {tab == 0 && <Deposit />}
            {tab == 1 && <Withdraw />}
            <Typography variant="caption" gutterBottom align="center">
              Current Pool Size: 10000000 VET
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
        </Paper>
      </div>
    </div>
  );
};

export default App;
