import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('https://9000.vs.amypo.com/api/users/register', { email, password });
      alert(res.data);
      navigate('/');
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" align="center">Register</Typography>
        <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
        <TextField fullWidth type="password" label="Password" margin="normal" onChange={e => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" onClick={handleRegister}>Register</Button>
        <Typography mt={2} textAlign="center">
          Already have an account? <a href="/">Login</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;
