const Darilka = artifacts.require("./Darilka.sol");

module.exports = function(deployer) {
  deployer.deploy(Darilka, 2500000000000000, 2500000000000000);
};
