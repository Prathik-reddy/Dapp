const Funder = artifacts.require("funder");

module.exports = function (deployer) {
  deployer.deploy(Funder);
};