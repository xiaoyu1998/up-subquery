# UP-SubQuery

## Download
```shell
git clone git@github.com:xiaoyu1998/up-subquery.git --recursive
```

## Install dependencies
```shell
npm install -g @subql/cli
```
#### Configuration 
```shell
1.geth ENDPOINT and CHAIN_ID in .env
2.EventEmitter contract address in line57 in project.ts
```

## Install and build project
```shell
npm i 
yarn build
```

## Run project
```shell
docker-compose pull && docker-compose up
```

## Query your project

```graphql
{
  query {
    deposits(first: 5) {
      nodes {
        id
        blockHeight
        contractAddress
        pool
        depositer
        amount
      }
    }
  }
}
```