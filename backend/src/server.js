import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Sdk } from '@unique-nft/sdk/full';
import {Sr25519Account} from '@unique-nft/sr25519';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const uniqueNetworkEndpoint = process.env.UNIQUE_NETWORK_ENDPOINT;

app.use(cors());
app.use(express.json());

const account = Sr25519Account.fromUri(process.env.MNEMONIC);
// Initialize Unique Network SDK
const sdk = new Sdk({
  baseUrl: uniqueNetworkEndpoint,
  account
});

// Test SDK connection
sdk.common.chainProperties()
  .then(() => console.log('Successfully connected to Unique Network'))
  .catch(error => console.error('Failed to connect to Unique Network:', error));

console.log('SDK initialized with endpoint:', uniqueNetworkEndpoint);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the NFT Game API');
});

// Create Racing Cars Collection
app.post('/api/create-racing-cars-collection', async (req, res) => {
  try {
    console.log('Received request to create racing cars collection');
    console.log('Request body:', req.body);

    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ success: false, error: 'Address is required' });
    }

    console.log('Using SDK to create collection');
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
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    res.status(500).json({ 
      success: false, 
      error: error.message, 
      stack: error.stack,
      details: JSON.stringify(error, Object.getOwnPropertyNames(error))
    });
  }
});

// Catch-all for undefined routes
app.use((req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).send('Route not found');
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
  console.log('Available routes:');
  console.log('  GET  /');
  console.log('  POST /api/create-racing-cars-collection');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});