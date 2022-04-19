/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "./tasks/balance.task";

dotenv.config();

const {
  API_URL,
  PRIVATE_KEY,
  MATIC_PRIVATE_KEY,
  MAINNET_PRIVATE_KEY,
  API_URL_RINKEBY,
  API_URL_POLYGON,
  ETHERSCAN,
  POLYGONSCAN,
  API_URL_POLYGON_MAINNET,
  API_URL_MAINNET,
} = process.env;

module.exports = {
  solidity: "0.8.11",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    rinkeby: {
      url: API_URL_RINKEBY,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    polygonMumbai: {
      url: API_URL_POLYGON,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    polygon: {
      url: API_URL_POLYGON_MAINNET,
      accounts: [`0x${MATIC_PRIVATE_KEY}`],
    },
    mainnet: {
      url: API_URL_MAINNET,
      accounts: [`0x${MAINNET_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN,
      rinkeby: ETHERSCAN,
      polygonMumbai: POLYGONSCAN,
      polygon: POLYGONSCAN,
    },
  },
};
