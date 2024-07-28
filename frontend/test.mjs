import { Sdk } from '@unique-nft/sdk/full';
import { KeyringProvider } from '@unique-nft/accounts/keyring';

const createCollection = async () => {
  const mnemonic = 'excuse reward sentence shoe evolve volume poem security soap bind true grape'; // Replace with your actual mnemonic
  const keyringProvider = await KeyringProvider.fromMnemonic(mnemonic);
  const address = keyringProvider.instance.address;

  const sdk = new Sdk({
    baseUrl: 'https://rest.unique.network/opal/v1',
    signer: keyringProvider,
  });

  try {
    const result = await sdk.collections.creation.submitWaitResult({
      address,
      name: 'My Game Collection',
      description: 'NFTs for my race car game',
      tokenPrefix: 'RACE'
    });

    console.log('Collection created with ID:', result.collectionId);
  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

createCollection();