// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/';

// export const getNftData = async (account) => {
//   try {
//     const response = await fetch(`${API_URL}/nft-data/${account}`);
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || 'Failed to fetch NFT data');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error in getNftData:', error);
//     throw error;
//   }
// };
  
// export const updateNftData = async (data) => {
//   const response = await axios.post(`${API_URL}/update-nft`, data);
//   return response.data;
// };

// export const tradeAccomplishment = async (tokenId, accomplishmentId) => {
//   const response = await axios.post(`${API_URL}/trade`, { tokenId, accomplishmentId });
//   return response.data;
// };

// export const getLeaderboard = async () => {
//   const response = await axios.get(`${API_URL}/leaderboard`);
//   return response.data;
// };