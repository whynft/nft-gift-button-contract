const utils = require("./utils");
const Erc721Fake = artifacts.require("ERC721Fake");


contract("Erc721Fake", (accounts) => {
    let [alice, bob, backend] = accounts;

    it("Should not allow to not owner to approve", async () => {
        const tokenId = 1;
        // Alice mint
        const erc721FakeContractInstance = await Erc721Fake.new({from: backend});
        await erc721FakeContractInstance.safeMint(alice, 1, {from: alice});
        // approve by not owner
        await utils.shouldThrow(erc721FakeContractInstance.approve(bob, tokenId, {from: bob}));
    })

    it("Fake erc721 should not allow to transfer from not approved", async () => {
        const tokenId = 1;
        // Alice mint
        const erc721FakeContractInstance = await Erc721Fake.new({from: backend});
        await erc721FakeContractInstance.safeMint(alice, 1, {from: alice});
        // transfer as bob (not approved before)
        await utils.shouldThrow(erc721FakeContractInstance.safeTransferFrom(alice, bob, tokenId, {from: bob}))
        const owner = await erc721FakeContractInstance.ownerOf(tokenId);
        assert.equal(owner, alice);
    })

    it("Fake erc721 should allow to approve. Thus we check approve for bob and transfer himself as from approved", async () => {
        const tokenId = 1;
        // Alice mint
        const erc721FakeContractInstance = await Erc721Fake.new({from: backend});
        await erc721FakeContractInstance.safeMint(alice, 1, {from: alice});
        // Alice approve
        const approved = await erc721FakeContractInstance.approve(bob, tokenId, {from: alice});
        assert.equal(approved.receipt.status, true);
        // transfer as approved bob
        const transferred = await erc721FakeContractInstance.safeTransferFrom(alice, bob, tokenId, {from: bob})
        assert.equal(transferred.receipt.status, true)
        const newOwner = await erc721FakeContractInstance.ownerOf(tokenId);
        assert.equal(newOwner, bob);
    })
})
