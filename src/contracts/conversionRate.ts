import { useState, useEffect } from "react";

interface ConversionRate {
  amountTHOR: string;
  amountVET: string;
}

const conversionAccount = "0xB74C4EBd95F70Dd9794d8c49053a297689950b63";
const thorAccount = "0x0000000000000000000000000000456e65726779";
const account = process.env.REACT_APP_VECHAIN_POOL!;

const balanceOfABI = {
  constant: true,
  inputs: [
    {
      name: "_owner",
      type: "address"
    }
  ],
  name: "balanceOf",
  outputs: [
    {
      name: "balance",
      type: "uint256"
    }
  ],
  payable: false,
  stateMutability: "view",
  type: "function"
};

const conversionABI = {
  name: "getTokenToEthInputPrice",
  outputs: [
    {
      type: "uint256",
      name: "out"
    }
  ],
  inputs: [
    {
      type: "uint256",
      name: "tokens_sold"
    }
  ],
  constant: true,
  payable: false,
  type: "function",
  gas: 7458
};

export const getConversion = (currentBlock: number | undefined) => {
  const [loading, setLoading] = useState(true);
  const [currentConversion, setCurrentConversion] = useState<ConversionRate>();

  useEffect(() => {
    const getCurrentConversion = async () => {
      const thorBalance = await connex.thor
        .account(thorAccount)
        .method(balanceOfABI)
        .call(account);

      const formattedThorBalance = (thorBalance.decoded!["0"] / 1e18).toFixed(
        2
      );

      if (formattedThorBalance === "0.00") {
        setCurrentConversion({
          amountTHOR: formattedThorBalance,
          amountVET: "0.00"
        });
      } else {
        const VETConversion = await connex.thor
          .account(conversionAccount)
          .method(conversionABI)
          .call(account);

        const formattedVETAmount = (VETConversion.decoded!["0"] / 1e18).toFixed(
          2
        );

        setCurrentConversion({
          amountTHOR: formattedThorBalance,
          amountVET: "~" + formattedVETAmount
        });
      }

      setLoading(false);
    };

    if (currentBlock) {
      getCurrentConversion();
    }
  }, [currentBlock]);

  return { loading, currentConversion };
};
