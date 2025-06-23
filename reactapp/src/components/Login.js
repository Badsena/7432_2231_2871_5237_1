import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post('https://9000.vs.amypo.com/api/users/login', { email, password });
    alert(res.data);
    if (res.data === 'Login successful!') navigate('/home');
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" align="center">Login</Typography>
        <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
        <Typography variant="body2" align="center" mt={2}>
          Don't have an account? <a href="/register">Register</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
