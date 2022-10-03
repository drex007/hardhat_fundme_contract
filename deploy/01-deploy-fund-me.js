//import
//main function 
//calling the main function 



// function deployFunc(){
//     console.log("Mian function");
// }


// module.exports.default = deployFunc
const {networkConfig} = require ("../helper-hardhat-config")


module.exports = async (hre) =>{ 
    const {getNamedAccounts, deployments } = hre // we want to get getNamedAccount and deployment from hre(hardhat-runtime-interface)
    const {deploy, log } = deployments  // Then we get our deploy and log function from deployment
    const {deployer} = getNamedAccounts()  //Then we get our deployer from the  getNamedAccount we access
    const chainId = network.config.chainId // get chainId from the network we want to deploy to

    const ethUsdPriceFeed = networkConfig[chainId]"ethUsdPriceFeed"

    const fundMe = await deploy("FundeMe", {
        from:deployer, // Address deploying the contract 
        args: [] ,
        log: true
    })

}