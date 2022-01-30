// For convenience to test Darilka that uses under hood erc721 features.
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


/**
* @title Very Fake implementation of ERC721 for testing some features in Darilka
* @dev I used to use the class because of
* @dev truffle openzippelin erc721 crooked importing system.
*/
contract ERC721Fake {

    modifier onlyOwnerOf(uint _nftId) {
        require(msg.sender == nftToOwner[_nftId]);
        _;
    }

    struct Nft {
        uint256 tokenId;
    }

    Nft[] public nfts;

    mapping (uint => address) public nftToOwner;
    mapping (uint => address) nftApprovals;

    function safeMint(address _to, uint256 _tokenId) external returns (bool) {
        nftToOwner[_tokenId] = _to;
        nfts.push(Nft(_tokenId));
        return true;
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return nftToOwner[_tokenId];
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external {
        require (nftToOwner[_tokenId] == msg.sender || nftApprovals[_tokenId] == msg.sender);
        require(_from == nftToOwner[_tokenId]);
        nftToOwner[_tokenId] = _to;
    }

    function approve(address _approved, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        nftApprovals[_tokenId] = _approved;
//        todo: emit event that has is in erc721? (currently no event feature use)
    }
}
