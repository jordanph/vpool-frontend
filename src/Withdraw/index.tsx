import React, { useState, ChangeEvent } from "react";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import VETImage from "../images/vechain-logo.png";
import styled from "styled-components";
import { withdrawABI } from "../contracts/vpoolABI";
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

const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState<number>();
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (inputEvent: ChangeEvent<HTMLInputElement>) => {
    try {
      setWithdrawAmount(parseInt(inputEvent.target.value));
      setInvalidInput(false);
    } catch {
      setInvalidInput(true);
    }
  };

  const onClick = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      setInvalidInput(true);
    } else {
      setLoading(true);

      const signingService = connex.vendor.sign("tx");

      const amountToWithdraw =
        "0x" +
        new BigNumber(withdrawAmount)
          .multipliedBy(1e18)
          .dp(0)
          .toString(16);

      const withdrawClause = connex.thor
        .account(account)
        .method(withdrawABI)
        .asClause(amountToWithdraw);

      try {
        await signingService.request([{ ...withdrawClause }]);
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
        error={invalidInput}
        disabled={loading}
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
        disabled={loading}
        fullWidth
        onClick={onClick}
      >
        Withdraw
      </Button>
    </div>
  );
};

export default Withdraw;
