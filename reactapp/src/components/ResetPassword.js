import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

function ResetPassword() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const email = params.get("email");

  const handleReset = async () => {
    if (password !== confirm) return setMsg("Passwords do not match");

    try {
      const res = await axios.post("https://9000.vs.amypo.com/api/users/verify-otp-reset", {
        email,
        otp,
        newPassword: password
      });
      setMsg(res.data);
      setTimeout(() => navigate("/"), 2000);
    } catch {
      setMsg("Reset failed or OTP invalid");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" align="center">Reset Password</Typography>
        <TextField fullWidth label="OTP" margin="normal" onChange={e => setOtp(e.target.value)} />
        <TextField fullWidth label="New Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
        <TextField fullWidth label="Confirm Password" type="password" margin="normal" onChange={e => setConfirm(e.target.value)} />
        <Button fullWidth variant="contained" onClick={handleReset}>Reset Password</Button>
        <Typography mt={2} color="primary">{msg}</Typography>
      </Box>
    </Container>
  );
}

export default ResetPassword;
