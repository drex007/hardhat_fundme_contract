//import
//main function 
//calling the main function 



// function deployFunc(){
//     console.log("Mian function");
// }


// module.exports.default = deployFunc
const {networkConfig, developmentChains} = require ("../helper-hardhat-config")
const { network } = require("hardhat")


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

    const fundMe = await deploy("FundMe", {
        from:deployer, // Address deploying the contract 
        args: [ethUsdPriceFeedAddress] ,
        log: true
    })
    log("---------------------------->")

}

module.exports.tags = ["all", "fundme"]