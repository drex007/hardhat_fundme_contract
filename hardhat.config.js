require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */



const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      { version: "0.8.8" },
      { version: "0.6.6" }
    ]
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
      blockConfirmations: 6,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6
    }
  },
  namedAccounts: { // This namedAccount objecct is necessary inorder to allow harhat choose which of the address to use 
    deployer: {
      default: 0, // here this will  by default take the first account as deployer
      1: 0, // similarly on mainnet or testnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another

    },
  },
};
