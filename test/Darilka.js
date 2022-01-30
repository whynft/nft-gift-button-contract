const utils = require("./utils");
const Darilka = artifacts.require("Darilka");
const Erc721Fake = artifacts.require("ERC721Fake");

const defaultCommission = 2500000000000000;
const defaultAmountForReceiver = 2500000000000000;
const defaultSenderCost = (defaultAmountForReceiver + defaultCommission).toString()
const defaultPassword = "TestPassword";

// todo: book is payable, thus, means we should send eth with method when in truffle test
// todo: the second question why it should be >= 0.01 eth == defaultSenderCost?
// ps. in real world we do not send eth with this method
const defaultAmountForBook = "10000000000000000"


contract("Darilka", (accounts) => {
    let [alice, bob, backend] = accounts;
    let contractInstance;

    beforeEach(async () => {
        contractInstance = await Darilka.new(defaultCommission, defaultAmountForReceiver, {from: backend});
    });
    // afterEach(async () => {
    //    await contractInstance.kill();
    // });

    context("Primitive checks", async () => {
        it("Should commission be equal as set", async () => {
            const commission = await contractInstance.getComission();
            assert.equal(commission, defaultCommission);
        })

        it("Not owner could not change contract owner", async () => {
            await utils.shouldThrow(contractInstance.setOwner(alice, {from: alice}));
        })

        it("Fake erc721 should be able to safeMint", async () => {
            const erc721FakeContractInstance = await Erc721Fake.new({from: backend});
            const result = await erc721FakeContractInstance.safeMint(alice, 1, {from: alice});
            assert.equal(result.receipt.status, true);
        })
    })

    context("Password scenarios", async () => {
        it("Should be able to set password, i.e. confirmation", async () => {
            const tokenId = 1;
            const erc721FakeContractInstance = await Erc721Fake.new({from: backend});
            const result = await erc721FakeContractInstance.safeMint(alice, tokenId, {from: alice});
            assert.equal(result.receipt.status, true);

            const hashPassword = web3.utils.keccak256(defaultPassword);
            const resultOfConfirmation = await contractInstance.setConfirmation(
                erc721FakeContractInstance.address,
                tokenId,
                hashPassword,
                {from: alice, value: defaultSenderCost}
            )
            assert.equal(resultOfConfirmation.receipt.status, true);
        })
    })

    context("Book scenarios", async () => {
        it("Should allow backend to book", async () => {
            const tokenId = 1;
            const erc721FakeContractInstance = await Erc721Fake.new({from: backend});

            const result = await contractInstance.bookTransfer(
                bob,
                erc721FakeContractInstance.address,
                tokenId,
                {from: backend, value: defaultAmountForBook},
            )
            assert.equal(result.receipt.status, true);
        })

        it("Should not allow to call bookTransfer others, e.g. Bob", async () => {
            const tokenId = 1;
            const erc721FakeContractInstance = await Erc721Fake.new({from: backend});

            await utils.shouldThrow(contractInstance.bookTransfer(
                bob,
                erc721FakeContractInstance.address,
                tokenId,
                {from: bob, value: defaultAmountForBook},
                )
            );
        })
    })

    // todo: test performTransferNFT
})
