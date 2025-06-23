import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      const res = await axios.post('https://9000.vs.amypo.com/api/users/login', { email, password });
      localStorage.setItem('token', res.data);
      navigate('/home');
    } catch {
      alert("Invalid credentials");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post('https://9000.vs.amypo.com/api/users/oauth/google', {
        idToken: credentialResponse.credential
      });
      localStorage.setItem('token', res.data);
      navigate('/home');
    } catch {
      alert("Google login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" align="center">Login</Typography>
        <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
        <TextField fullWidth type="password" label="Password" margin="normal" onChange={e => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" onClick={handleEmailLogin}>Login</Button>

        <Box mt={3} textAlign="center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google Sign-in Error")}
          />
        </Box>

        <Typography mt={2} textAlign="center">
          Don't have an account? <a href="/register">Register</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
