import { totalMintedSupplyABI, balanceOfABI } from "./vpoolABI";
import { useState, useEffect } from "react";

interface Information {
  balanceOfUser: number;
  balance: number;
  generationRate: string;
  userGenerationRate: string;
  userInformation: boolean;
}

const account = process.env.REACT_APP_VECHAIN_POOL!;

export const getInformation = (
  currentBlock: number | undefined,
  accountAddress: string | undefined
) => {
  const [loading, setLoading] = useState(true);
  const [currentInformation, setCurrentInformation] = useState<Information>();

  useEffect(() => {
    const getCurrentInformation = async () => {
      const balance = await connex.thor.account(account).get();
      const formattedBalance = Math.round(parseInt(balance.balance, 16) / 1e18);

      if (accountAddress) {
        const totalMintedSupply = await connex.thor
          .account(account)
          .method(totalMintedSupplyABI)
          .call();

        const balanceOf = await connex.thor
          .account(account)
          .method(balanceOfABI)
          .call(accountAddress);

        const formattedBalanceOf =
          totalMintedSupply.decoded!["0"] != 0
            ? Math.floor(
                (balanceOf.decoded!["0"] / totalMintedSupply.decoded!["0"]) *
                  formattedBalance
              )
            : 0;

        setCurrentInformation({
          balanceOfUser: formattedBalanceOf,
          userGenerationRate: (formattedBalanceOf * 0.000432).toFixed(2),
          userInformation: true,
          balance: formattedBalance,
          generationRate: (formattedBalance * 0.000432).toFixed(2)
        });
      } else {
        setCurrentInformation({
          balanceOfUser: 0,
          userGenerationRate: "",
          userInformation: false,
          balance: formattedBalance,
          generationRate: (formattedBalance * 0.000432).toFixed(2)
        });
      }

      setLoading(false);
    };

    if (currentBlock) {
      getCurrentInformation();
    }
  }, [currentBlock, accountAddress]);

  return { loading, currentInformation };
};
