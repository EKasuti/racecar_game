import { connectSdk } from "../src/utils/connect-sdk.js";
import { getRandomInt } from "../src/utils/random.js";
import { fileURLToPath } from 'url';

export const createToken = async (collectionId, owner, nickname) => {
  const { account, sdk } = await connectSdk();

  // Get pseudo-random car image for fun
  const tokenImage = getRandomInt(2) === 0
    ? "https://gateway.pinata.cloud/ipfs/QmfWKy52e8pyH1jrLu4hwyAG6iwk6hcYa37DoVe8rdxXwV"
    : "https://gateway.pinata.cloud/ipfs/QmNn6jfFu1jE7xPC2oxJ75kY1RvA2tz9bpQDsqweX2kDig"

  const tokenTx = await sdk.token.createV2({
    collectionId,
    image: tokenImage,
    owner,
    attributes: [
      { trait_type: "Nickname", value: nickname },
      { trait_type: "Score", value: 0 },
      { trait_type: "Best Lap", value: "00:00.000" },
      { trait_type: "Wins", value: 0 },
      { trait_type: "Total Playing Time", value: "0" },
      { trait_type: "Position Gains Per Race", value: 0 },
    ],
  });

  const token = tokenTx.parsed;
  if (!token) throw Error("Cannot parse token");

  return token;
}

// Check if the script is being run directly
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error("run this command: node ./src/3-create-car.js {collectionId} {address} {nickname}");
    process.exit(1);
  }

  createToken(...args)
    .then(token => {
      console.log(`Explore your NFT: https://uniquescan.io/opal/tokens/${token.collectionId}/${token.tokenId}`);
      process.exit(0);
    })
    .catch(e => {
      console.log('Something wrong during token creation');
      throw e;
    });
}