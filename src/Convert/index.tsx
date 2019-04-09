import React, { FunctionComponent } from "react";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import VETImage from "../images/vechain-logo.png";
import THORImage from "../images/thor.png";
import { getConversion } from "../contracts/conversionRate";

const energyConversionABI = {
  constant: true,
  inputs: [],
  name: "convertEnergy",
  outputs: [
    {
      name: "",
      type: "uint256"
    }
  ],
  payable: false,
  stateMutability: "view",
  type: "function"
};

const account = process.env.REACT_APP_VECHAIN_POOL!;

interface ConvertProps {
  currentBlock: number | undefined;
}

const Convert: FunctionComponent<ConvertProps> = ({ currentBlock }) => {
  const { loading, currentConversion } = getConversion(currentBlock);

  const onClick = async () => {
    const signingService = connex.vendor.sign("tx");

    const conversionClause = connex.thor
      .account(account)
      .method(energyConversionABI)
      .asClause();

    try {
      await signingService.request([{ ...conversionClause }]);
    } catch {}
  };

  return (
    <div>
      <TextField
        style={{ marginBottom: 30, width: "100%" }}
        id="outlined-number"
        label="Amount"
        margin="normal"
        variant="outlined"
        disabled={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={THORImage} style={{ height: 15, paddingRight: 5 }} />
              <span style={{ paddingTop: 2 }}>
                {!loading && currentConversion!.amountTHOR}
              </span>
              <span style={{ paddingTop: 2 }}> THOR</span>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <span style={{ paddingTop: 2 }}>
                {!loading && currentConversion!.amountVET}
              </span>
              <span style={{ paddingTop: 2 }}> VET</span>
              <img src={VETImage} style={{ height: 15, paddingLeft: 5 }} />
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
        disabled={loading || currentConversion!.amountTHOR === "0.00"}
        onClick={onClick}
      >
        Convert
      </Button>
    </div>
  );
};

export default Convert;
