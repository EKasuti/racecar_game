import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Sdk } from '@unique-nft/sdk/full';
import { KeyringProvider } from '@unique-nft/accounts/keyring';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const uniqueNetworkEndpoint = process.env.UNIQUE_NETWORK_ENDPOINT;
const mnemonic = process.env.MNEMONIC;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(express.json());

// Initialize Unique Network SDK
let sdk;
let signer;

async function initializeSdk() {
  try {
    signer = await KeyringProvider.fromMnemonic(mnemonic);
    sdk = await Sdk.create({
      baseUrl: uniqueNetworkEndpoint,
      signer,
    });
    console.log('SDK initialized successfully');
  } catch (error) {
    console.error('Failed to initialize SDK:', error);
  }
}

initializeSdk();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the NFT Game API');
});

app.post('/api/create-racing-cars-collection', async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ success: false, error: 'Address is required' });
    }

    const result = await sdk.collections.creation.submitWaitResult({
      address,
      name: 'Racing Cars',
      description: 'Collection for racing car NFTs',
      tokenPrefix: 'RC'
    });

    console.log('Collection created successfully:', result);
    res.json({ success: true, collectionId: result.collectionId });
  } catch (error) {
    console.error('Error creating racing cars collection:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: JSON.stringify(error, Object.getOwnPropertyNames(error))
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Available routes:');
  console.log('  GET  /');
  console.log('  POST /api/create-racing-cars-collection');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});