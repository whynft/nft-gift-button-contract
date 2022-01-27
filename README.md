# nft-gift-button-contract

# Develop

## Docker
In repo I present Dockerfile with truffle instiled, in order to compile, 
run tests and etc with truffle I suppose you will use **Run & Connect** interactive mode

### Build:
```bash
docker build -t nft-gift-contract -f Dockerfile .
```

### Run & Connect:
```bash
docker run --rm -v $(pwd):/opt -it --entrypoint bash nft-gift-contract
```
