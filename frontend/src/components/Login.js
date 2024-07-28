import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function Login() {
  const [address, setAddress] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setStatus('Starting login process...');

    try {
      // Validate input
      if (!address || !nickname) {
        throw new Error('Please enter both address and nickname');
      }

      // Step 1: Create Racing Cars Collection
      setStatus('Creating Racing Cars Collection...');
      console.log('Sending request to create racing cars collection');
      const racingCarsResponse = await axios.post(`http://localhost:3001/create-racing-cars-collection`, { address });
      console.log('Racing cars collection response:', racingCarsResponse.data);
      
      if (!racingCarsResponse.data.success) {
        throw new Error('Failed to create Racing Cars Collection');
      }
      const racingCarsCollectionId = racingCarsResponse.data.collectionId;
      setStatus(`Racing Cars Collection created with ID: ${racingCarsCollectionId}`);

      // Store data in localStorage
      const userData = {
        address,
        nickname,
        racingCarsCollectionId
      };
      localStorage.setItem('userData', JSON.stringify(userData));

      setStatus('Login successful! Redirecting to profile...');
      setTimeout(() => navigate('/user'), 2000);
    } 
    catch (error) {
      console.error('Login error:', error);
      if (error.message === 'Network Error') {
        setError('Unable to connect to the server. Please check your internet connection and ensure the server is running.');
      } else if (error.response && error.response.data) {
        setError(`Server error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError(`An error occurred: ${error.message || 'Unknown error'}`);
      }
      setStatus('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Substrate Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
      />
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
      />
      <button 
        onClick={handleLogin} 
        disabled={loading}
        style={{ width: '100%', padding: '10px', backgroundColor: loading ? '#ccc' : '#007bff', color: 'white', border: 'none' }}
      >
        {loading ? 'Processing...' : 'Login'}
      </button>
      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default Login;