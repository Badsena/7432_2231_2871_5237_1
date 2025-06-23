import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://9000.vs.amypo.com/api/users/home', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        setMessage(res.data);
      } catch {
        setMessage("Unauthorized");
        setTimeout(logout, 2000);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={10} textAlign="center">
        <Typography variant="h4">🏠 Home</Typography>
        <Typography mt={2}>{message}</Typography>
        <Typography color="error" mt={2}>Session expires in: {countdown} seconds</Typography>
        <Button variant="contained" color="error" onClick={logout} sx={{ mt: 2 }}>Logout</Button>
      </Box>
    </Container>
  );
}

export default Home;
