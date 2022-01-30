# nft-gift-button-contract

# Develop
The repo prepared for continues contarct development with truffle.

## Docker
In repo I present Dockerfile with truffle instiled, in order to compile, 
run tests and etc with truffle. I suppose you will use **Run & Connect** bash-interactive mode.

### Build:
```bash
docker build -t nft-gift-contract -f Dockerfile .
```

### Run & Connect:
```bash
docker run --rm -v $(pwd):/opt -it --entrypoint bash nft-gift-contract
```
Now you are ready to develop project and use truffle (compile, test, deploy), npm.

# Truffle
Truffle helps you to test and migrate with 1 command to declared networks 

> for declared networks check [truffle-config.js](truffle-config.js)

## Env
Prepare `.env` file as it in [.env.example](.env.example).

## Commands
To compile json files from contracts to build](build) directory
```bash
truffle compile
```

To deploy contract on rinkeby
> for deploy params (i.e. construct params check [migrations/2_darilka.js](migrations/2_darilka.js))
```bash
truffle migrate --network rinkeby
```

To test on local truffle chain
```bash
truffle test
```
