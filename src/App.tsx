import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "@material-ui/core/Link";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Information from "./Information";
import Header from "./Header";
import { getCurrentBlock } from "./contracts/currentBlock";
import Overlay from "./Overlay";
import Convert from "./Convert";
import styled from "styled-components";
import AppInformation from "./AppInformation";

const tabEnum = {
  Deposit: 0,
  Withdraw: 1,
  Convert: 2
};

const MainDiv = styled.div`
  padding: 20px;
  width: 80%;
`;

const AppDiv = styled.div`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const App = () => {
  const [tab, setTab] = useState(0);
  const { loading, currentBlockNumber } = getCurrentBlock();

  const handleChange = (_: any, value: number) => {
    setTab(value);
  };

  return (
    <div>
      <Header />
      <AppInformation />
      <AppDiv>
        <Paper
          square
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {!window.connex && <Overlay />}
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            <Tab label="Deposit" />
            <Tab label="Withdraw" />
            <Tab label="Convert" />
          </Tabs>
          <MainDiv>
            {tab == tabEnum.Deposit && <Deposit />}
            {tab == tabEnum.Withdraw && <Withdraw />}
            {tab == tabEnum.Convert && (
              <Convert currentBlock={currentBlockNumber} />
            )}
            <Information currentBlockNumber={currentBlockNumber} />
          </MainDiv>
        </Paper>
      </AppDiv>
    </div>
  );
};

export default App;
