import { useState, useEffect } from "react";

export const getCurrentBlock = () => {
  const [loading, setLoading] = useState(false);
  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>();

  useEffect(() => {
    const getCurrentBlock = async () => {
      setLoading(true);

      const currentBlock = await connex.thor.block().get();

      setCurrentBlockNumber(currentBlock!.number);
      setLoading(false);
    };

    const ticker = async () => {
      await connex.thor
        .ticker()
        .next()
        .then(async () => {
          const currentBlock = await connex.thor.block().get();

          setCurrentBlockNumber(currentBlock!.number);
        });

      ticker();
    };

    if (window.connex) {
      getCurrentBlock();
      ticker();
    }
  }, []);

  return { loading, currentBlockNumber };
};
