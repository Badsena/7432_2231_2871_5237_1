import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await axios.post('https://9000.vs.amypo.com/api/users/register', { name, email, password });
    alert(res.data);
    if (res.data === 'Registered successfully!') navigate('/');
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" align="center">Register</Typography>
        <TextField label="Name" fullWidth margin="normal" onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" fullWidth onClick={handleRegister}>Register</Button>
        <Typography variant="body2" align="center" mt={2}>
          Already have an account? <a href="/">Login</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;
