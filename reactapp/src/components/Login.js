

import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, TextField, Button, Typography, Box, createTheme,
  ThemeProvider, CssBaseline, Switch, FormControlLabel
} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box mt={8}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            }
            label="Dark Mode"
          />

          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            onChange={e => setPassword(e.target.value)}
          />
          <Typography align="right" mt={1}>
              <a href="/forgot-password">Forgot Password?</a>
          </Typography>


          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleEmailLogin}
            sx={{ mt: 2, mb: 2 }}
          >
            Login
          </Button>

          <Box mt={2}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => alert("Google Sign-in Error")}
              width="100%"
              ux_mode="popup"
              theme={darkMode ? 'filled_black' : 'outline'}
            />
          </Box>

          <Typography mt={3} textAlign="center">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
