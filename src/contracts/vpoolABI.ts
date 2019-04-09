export const totalMintedSupplyABI = {
  constant: true,
  inputs: [],
  name: "totalMintedSupply",
  outputs: [
    {
      name: "",
      type: "uint256"
    }
  ],
  payable: false,
  stateMutability: "view",
  type: "function",
  signature: "0x601e2603"
};

export const balanceOfABI = {
  constant: true,
  inputs: [
    {
      name: "",
      type: "address"
    }
  ],
  name: "balanceOf",
  outputs: [
    {
      name: "",
      type: "uint256"
    }
  ],
  payable: false,
  stateMutability: "view",
  type: "function",
  signature: "0x70a08231"
};

export const depositABI = {
  constant: false,
  inputs: [],
  name: "deposit",
  outputs: [],
  payable: true,
  stateMutability: "payable",
  type: "function",
  signature: "0xd0e30db0"
};

export const withdrawABI = {
  constant: false,
  inputs: [
    {
      name: "amount",
      type: "uint256"
    }
  ],
  name: "withdraw",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function",
  signature: "0x2e1a7d4d"
};
