import { totalMintedSupplyABI, balanceOfABI } from "./vpoolABI";
import { useState, useEffect } from "react";

interface Information {
  totalMintedSupply: string;
  balanceOf: string;
  balance: string;
}

const account = process.env.REACT_APP_VECHAIN_POOL!;

export const getInformation = (currentBlock: number) => {
  const [loading, setLoading] = useState(true);
  const [currentInformation, setCurrentInformation] = useState<Information>();

  useEffect(() => {
    const getCurrentInformation = async () => {
      const totalMintedSupply = await connex.thor
        .account(account)
        .method(totalMintedSupplyABI)
        .call();
      // const balanceOf = await connex.thor
      //   .account(account)
      //   .method(balanceOfABI)
      //   .call();
      const balance = await connex.thor.account(account).get();

      setCurrentInformation({
        totalMintedSupply: totalMintedSupply.decoded!["0"],
        balanceOf: "blah blah blah",
        balance: balance.balance
      });

      setLoading(false);
    };

    getCurrentInformation();
  }, [currentBlock]);

  return { loading, currentInformation };
};
