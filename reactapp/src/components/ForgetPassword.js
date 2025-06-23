import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRequest = async () => {
  try {
    const res = await axios.post('https://9000.vs.amypo.com/api/users/forgot-password-otp', { email });
    setMsg(res.data);
    setTimeout(() => navigate(`/reset-password?email=${email}`), 1000);
  } catch (err) {
    console.error(err); // Optional: log error
    setMsg("Failed to send OTP");
  }
};


  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5">Forgot Password</Typography>
        <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
        <Button fullWidth variant="contained" onClick={handleRequest}>Send OTP</Button>
        <Typography mt={2} color="primary">{msg}</Typography>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
