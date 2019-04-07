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

    connex.thor
      .ticker()
      .next()
      .then(async () => {
        const currentBlock = await connex.thor.block().get();

        setCurrentBlockNumber(currentBlock!.number);
      });

    getCurrentBlock();
  }, []);

  return { loading, currentBlockNumber };
};
