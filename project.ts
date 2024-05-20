 import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

import * as dotenv from 'dotenv';
import path from 'path';

const mode = process.env.NODE_ENV || 'production';

// Load the appropriate .env file
const dotenvPath = path.resolve(process.cwd(), `.env${mode !== 'production' ? `.${mode}` : ''}`);
dotenv.config({ path: dotenvPath });

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "ethereum-goerli-starter",
  description:
    "This project can be use as a starting point for developing your new Ethereum Goerli SubQuery project",
  runner: {
    node: {
      name: "@subql/node-ethereum",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /**
     * chainId is the EVM Chain ID, for Ethereum Goerli this is 5
     * https://chainlist.org/chain/5
     */
    chainId: process.env.CHAIN_ID!,
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: process.env.ENDPOINT!?.split(',') as string[] | string,
  },
  dataSources: [{
    kind: EthereumDatasourceKind.Runtime,
    startBlock: 1,
    options: {
      abi: 'EventEmitter',
      address: '0x8069B0f6579130dE99cbA868cB9D9CF512892ecd',
    },
    assets: new Map([['EventEmitter', {file: './abis/EventEmitter.json'}]]),
    mapping: {
      file: './dist/index.js',
      handlers: [
  {
    handler: "handleBorrowEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Borrow(address,address,uint256,uint256)"
      ]
    }
  },
  {
    handler: "handleCloseEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Close(address,address,uint256,uint256,uint256)"
      ]
    }
  },
  {
    handler: "handleClosePositionEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "ClosePosition(address,address,address,uint256,uint256,uint256)"
      ]
    }
  },
  {
    handler: "handleDepositEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Deposit(address,address,uint256)"
      ]
    }
  },
  {
    handler: "handleLiquidationEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Liquidation(address,address,uint256,uint256,uint256,uint256)"
      ]
    }
  },
  {
    handler: "handlePoolUpdatedEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "PoolUpdated(address,uint256,uint256,uint256,uint256)"
      ]
    }
  },
  {
    handler: "handlePositionLiquidationEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "PositionLiquidation(address,address,address,uint256,uint256,uint256)"
      ]
    }
  },
  {
    handler: "handleRedeemEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Redeem(address,address,address,uint256)"
      ]
    }
  },
  {
    handler: "handleRepayEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Repay(address,address,uint256,bool)"
      ]
    }
  },
  {
    handler: "handleSupplyEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Supply(address,address,address,uint256)"
      ]
    }
  },
  {
    handler: "handleSwapEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Swap(address,address,address,uint256,uint256)"
      ]
    }
  },
  {
    handler: "handleWithdrawEventEmitterLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "Withdraw(address,address,address,uint256)"
      ]
    }
  }
]
    }
  },],
  repository: "https://github.com/subquery/ethereum-subql-starter",
};

// Must set default to the project instance
export default project;
