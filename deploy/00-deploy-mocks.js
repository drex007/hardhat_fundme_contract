// module.exports.default = deployFunc
const {networkConfig} = require ("../helper-hardhat-config")
const { network } = require("hardhat")
const {developmentChains, DECIMALS, INITIAL_ANSWER} = require("../helper-hardhat-config")


module.exports = async ( {getNamedAccounts, deployments }) =>{ 
    // we want to get getNamedAccount and deployment from hre(hardhat-runtime-interface)
    const {deploy, log } = deployments  // Then we get our deploy and log function from deployment
    const {deployer} = await getNamedAccounts()  //Then we get our deployer from the  getNamedAccount we access
    const chainId = network.config.chainId 

    if(developmentChains.includes(network.name)){
        log("local network detected deploying mocks")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER]
        })
        log("Mocks deployed------------------>")
        
    }    
}

module.exports.tags = ["all", "mocks"]