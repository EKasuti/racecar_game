const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

// Use environment variable for the WebSocket endpoint
const WS_ENDPOINT = process.env.WS_ENDPOINT || 'ws://127.0.0.1:9944';

async function createApi() {
  const wsProvider = new WsProvider(WS_ENDPOINT);
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;
  console.log('API is ready');
  return api;
}

async function createCollection(mnemonic) {
  const api = await createApi();
  const keyring = new Keyring({ type: 'sr25519' });
  const account = keyring.addFromMnemonic(mnemonic);

  // Check if the nftManager pallet exists
  if (!api.tx.nftManager) {
    throw new Error('nftManager pallet not found on this chain');
  }

  const tx = api.tx.nftManager.createCollection();
  const result = await tx.signAndSend(account);
  return result.toHuman();
}

async function createNFT(mnemonic, collectionId, metadata) {
  const api = await createApi();
  const keyring = new Keyring({ type: 'sr25519' });
  const account = keyring.addFromMnemonic(mnemonic);

  // Check if the nftManager pallet exists
  if (!api.tx.nftManager) {
    throw new Error('nftManager pallet not found on this chain');
  }

  const tx = api.tx.nftManager.mintNft(collectionId, metadata);
  const result = await tx.signAndSend(account);
  return result.toHuman();
}

module.exports = {
  createCollection,
  createNFT,
};