import React from 'react';
import { Typography, Container, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="sm">
      <Box mt={10} textAlign="center">
        <Typography variant="h4">Welcome to Home Page</Typography>
        <Typography variant="body1">You are successfully logged in.</Typography>
      </Box>
    </Container>
  );
}

export default Home;
