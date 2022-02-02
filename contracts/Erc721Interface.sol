// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


interface Erc721Interface {
    function ownerOf(uint256 tokenId) external returns(address);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
}
