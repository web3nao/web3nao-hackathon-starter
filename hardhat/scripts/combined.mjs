#!/usr/bin/env zx

const networksString = await fs.readFile(
  `${__dirname}/../configs/networks.json`
);
const networks = JSON.parse(networksString);

// const networks = [
//   {
//     name: "rinkeby",
//     id: 4,
//   },
//   {
//     name: "polygonMumbai",
//     id: 80001,
//   },
//   //   {
//   //     name: "mainnet",
//   //     id: 1,
//   //   },
//   //   {
//   //     name: "polygon",
//   //     id: 137,
//   //   },
// ];

console.log(chalk.blue(`>>> Compiling...`));
await $`npx hardhat compile`;

console.log(chalk.blue(`>>> Deploying...`));
const contracts = [];
for (const network of networks) {
  await $`export CURRENT_NETWORK=${network.name}`;
  const contract = await $`npx hardhat run deploy.js --network ${network.name}`;
  contracts.push({
    network: network.name,
    chainId: network.id,
    contract: contract.stdout.replace("\n", ""),
    verified: false,
    priceEth: network.priceEth,
    priceWei: network.priceWei,
    etherscan: network.etherscan,
    baseUri: network.baseUri,
  });
}

console.log(contracts);

console.log(chalk.blue(`>>> Writing contract addresses to json...`));
const outputFiles = [
  `${__dirname}/../addresses/${Date.now()}.json`,
  `${__dirname}/../../frontend-react/src/jsons/addresses.json`,
];
for (const outputFile of outputFiles) {
  await fs.writeFile(outputFile, JSON.stringify(contracts));
}

console.log(chalk.blue(`>>> Copying contract abi to frontend...`));
await $`cp ${__dirname}/../artifacts/contracts/DiyPunks.sol/DiyPunks.json ${__dirname}/../../frontend-react/src/jsons/DiyPunks.json`;

console.log(chalk.blue(`>>> Verifying...`));
const waitingTimeInSeconds = 300;

console.log(`Commands to verify contracts:`);
for (const contract of contracts) {
  console.log(
    `npx hardhat verify --network ${contract.network} ${contract.contract} "${contract.baseUri}" "${contract.priceWei}"`
  );
}

console.log(
  `Waiting for ${waitingTimeInSeconds}sec before verifying contracts...`
);
await sleep(waitingTimeInSeconds * 1000);
for (const contract of contracts) {
  await $`npx hardhat verify --network ${contract.network} ${contract.contract} "${contract.baseUri}" "${contract.priceWei}"`;
  contract.verified = true;
}
