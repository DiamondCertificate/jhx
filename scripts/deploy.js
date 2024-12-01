// Required Libraries
const { ethers } = require("hardhat");
const fs = require('fs'); // Import the file system module

async function main() {
  // Get the Contract Factories
  const MiningCompany = await ethers.getContractFactory("MiningCompany");
  const CuttingCompany = await ethers.getContractFactory("CuttingCompany");
  const GradingLab = await ethers.getContractFactory("GradingLab");
  const JewelryMaker = await ethers.getContractFactory("JewelryMaker");
  const JewelrySeller = await ethers.getContractFactory("JewelrySeller");
  const AccessControl = await ethers.getContractFactory("AccessControl");
  const DiamondTraceabilityNFT = await ethers.getContractFactory("DiamondTraceabilityNFT");

  // Deploy AccessControl first, as it will be used by DiamondTraceabilityNFT
  const accessControl = await AccessControl.deploy();
  await accessControl.deployed();
  console.log("AccessControl deployed to:", accessControl.address);

  // Deploy DiamondTraceabilityNFT next, as it will be used by other contracts
  const diamondTraceabilityNFT = await DiamondTraceabilityNFT.deploy(accessControl.address);
  await diamondTraceabilityNFT.deployed();
  console.log("DiamondTraceabilityNFT deployed to:", diamondTraceabilityNFT.address);

  // Deploy other Contracts
  const miningCompany = await MiningCompany.deploy(diamondTraceabilityNFT.address);
  await miningCompany.deployed();
  console.log("MiningCompany deployed to:", miningCompany.address);

  const cuttingCompany = await CuttingCompany.deploy(diamondTraceabilityNFT.address);
  await cuttingCompany.deployed();
  console.log("CuttingCompany deployed to:", cuttingCompany.address);

  const gradingLab = await GradingLab.deploy(diamondTraceabilityNFT.address);
  await gradingLab.deployed();
  console.log("GradingLab deployed to:", gradingLab.address);

  const jewelryMaker = await JewelryMaker.deploy(diamondTraceabilityNFT.address);
  await jewelryMaker.deployed();
  console.log("JewelryMaker deployed to:", jewelryMaker.address);

  const jewelrySeller = await JewelrySeller.deploy(diamondTraceabilityNFT.address);
  await jewelrySeller.deployed();
  console.log("JewelrySeller deployed to:", jewelrySeller.address);

  // Save deployed addresses to deployedAddresses.json
  const deployedAddresses = {
    AccessControl: accessControl.address,
    DiamondTraceabilityNFT: diamondTraceabilityNFT.address,
    MiningCompany: miningCompany.address,
    CuttingCompany: cuttingCompany.address,
    GradingLab: gradingLab.address,
    JewelryMaker: jewelryMaker.address,
    JewelrySeller: jewelrySeller.address,
  };

  fs.writeFileSync('deployedAddresses.json', JSON.stringify(deployedAddresses, null, 2));
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
