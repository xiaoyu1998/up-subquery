# UP-SubQuery

## Download
```shell
git clone git@github.com:xiaoyu1998/up-subquery.git --recursive
```

## Install dependencies
```shell
npm install -g @subql/cli
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