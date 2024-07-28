// export const connectWallet = async () => {
//   if (typeof window.ethereum !== 'undefined') {
//     try {
//       // Request account access
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       return accounts[0];
//     } catch (error) {
//       console.error("User denied account access");
//       return null;
//     }
//   } else {
//     console.log('Please install MetaMask!');
//     return null;
//   }
// };