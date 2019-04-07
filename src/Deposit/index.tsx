import React, { useState, ChangeEvent } from "react";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import VETImage from "../images/vechain-logo.png";
import styled from "styled-components";

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

  const handleChange = (inputEvent: ChangeEvent<HTMLInputElement>) => {
    try {
      setDepositAmount(parseInt(inputEvent.target.value));
      setInvalidInput(false);
    } catch {
      setInvalidInput(true);
    }
  };

  const onClick = () => {
    if (!depositAmount || depositAmount <= 0) {
      setInvalidInput(true);
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
        onClick={onClick}
      >
        Deposit
      </Button>
    </div>
  );
};

export default Deposit;
