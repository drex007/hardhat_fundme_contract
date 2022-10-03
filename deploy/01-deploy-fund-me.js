//import
//main function 
//calling the main function 



// function deployFunc(){
//     console.log("Mian function");
// }


// module.exports.default = deployFunc

require('dotenv').config()
const {networkConfig, developmentChains} = require ("../helper-hardhat-config")
const { network } = require("hardhat")
const {verify} = require("../utils/verify")


module.exports = async ({ getNamedAccounts, deployments}) =>{ 
     // we want to get getNamedAccount and deployment from hre(hardhat-runtime-interface)
    const {deploy, log } = deployments  // Then we get our deploy and log function from deployment
    const {deployer} = await  getNamedAccounts()  //Then we get our deployer from the  getNamedAccount we access
    const chainId = network.config.chainId // get chainId from the network we want to deploy to

    let ethUsdPriceFeedAddress
    if(developmentChains.includes(network.name)){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address

    } else {
         ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from:deployer, // Address deploying the contract 
        args: args ,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY ){
         await verify(fundMe.address, args)
    }

    log("---------------------------->")

}

module.exports.tags = ["all", "fundme"]