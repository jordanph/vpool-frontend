import React, { useState, ChangeEvent } from "react";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import VETImage from "../images/vechain-logo.png";
import styled from "styled-components";
import { depositABI } from "../contracts/vpoolABI";
import BigNumber from "bignumber.js";

const account = process.env.REACT_APP_VECHAIN_POOL!;

const NumberTextField = styled(({ ...props }) => <TextField {...props} />)`
  & input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  & input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Deposit = () => {
  const [depositAmount, setDepositAmount] = useState<number>();
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (inputEvent: ChangeEvent<HTMLInputElement>) => {
    try {
      setDepositAmount(parseInt(inputEvent.target.value));
      setInvalidInput(false);
    } catch {
      setInvalidInput(true);
    }
  };

  const onClick = async () => {
    if (!depositAmount || depositAmount <= 0) {
      setInvalidInput(true);
    } else {
      setLoading(true);

      const signingService = connex.vendor.sign("tx");

      const amountToDeposit =
        "0x" +
        new BigNumber(depositAmount)
          .multipliedBy(1e18)
          .dp(0)
          .toString(16);

      const depositClause = connex.thor
        .account(account)
        .method(depositABI)
        .value(amountToDeposit)
        .asClause();

      try {
        await signingService.request([{ ...depositClause }]);
      } catch {}
      setLoading(false);
    }
  };

  return (
    <div>
      <NumberTextField
        style={{ marginBottom: 30, width: "100%" }}
        id="outlined-number"
        label="Amount"
        onChange={handleChange}
        type="number"
        margin="normal"
        variant="outlined"
        disabled={loading}
        error={invalidInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <img src={VETImage} style={{ height: 15, paddingRight: 5 }} />{" "}
              <span style={{ paddingTop: 2 }}>VET</span>
            </InputAdornment>
          )
        }}
      />
      <Button
        size="large"
        variant="contained"
        color="primary"
        style={{ marginBottom: 20 }}
        fullWidth
        disabled={loading}
        onClick={onClick}
      >
        Deposit
      </Button>
    </div>
  );
};

export default Deposit;
