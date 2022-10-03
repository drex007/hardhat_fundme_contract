const {run}  = require ("hardhat")


const verify = async (contractAdress, args) => {
    console.log("verifying contract..................")
    //Why we are using try catch is to check if the contract is already verified because alot of p-ersons have worked on this project, if we dont use the try catch our deploy script will break , but the try catch and the if helpsthe contract to contibue if it has already being deployed
  try{
    //using the hardhat run method and the ether-scan verify task task 
    await run("verify:verify",{
      address:contractAdress,
      constructorArguments:args
    })
  
  } catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Already verified")
    } else{
      console.log(e.message)
    }
    
  }
  
  }


  module.exports = {
    verify
  }