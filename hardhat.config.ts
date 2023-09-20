import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-contract-sizer'
import { HardhatUserConfig } from 'hardhat/config'
import { SolcUserConfig } from 'hardhat/types'
import 'solidity-coverage'
const dotenv = require('dotenv')
dotenv.config()

const { PRIVATE_KEY } = process.env;

const DEFAULT_COMPILER_SETTINGS: SolcUserConfig = {
  version: '0.7.6',
  settings: {
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

if (process.env.RUN_COVERAGE == '1') {
  /**
   * Updates the default compiler settings when running coverage.
   *
   * See https://github.com/sc-forks/solidity-coverage/issues/417#issuecomment-730526466
   */
  console.info('Using coverage compiler settings')
  DEFAULT_COMPILER_SETTINGS.settings.details = {
    yul: true,
    yulDetails: {
      stackAllocation: true,
    },
  }
}

const config: HardhatUserConfig = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
    },
    testnet: {
      url: "https://arbitrum-goerli.publicnode.com",
      chainId: 421613,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mainnet: {
      url: "https://rpc.ankr.com/bsc",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    rinkeby: {
      url: "https://speedy-nodes-nyc.moralis.io/3ff17d7d4b11fbfa8d5cb8fc/eth/rinkeby",
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 210000000,
      gasPrice: 8000000000000,
    },
    matic: {
      url: "https://matic-mumbai.chainstacklabs.com/",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  contractSizer: {
    alphaSort: false,
    disambiguatePaths: true,
    runOnCompile: false,
  },
}

config.etherscan = {
  // Your API key for Etherscan
  // Obtain one at https://etherscan.io/
  apiKey: {
    arbitrumGoerli: "U1YT698CGTUDX6ZNMHH4GCG2HFMJZMJCNF"
  },
}


export default config
