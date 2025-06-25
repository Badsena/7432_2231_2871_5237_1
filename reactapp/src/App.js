import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

function App() {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login toggleTheme={toggleTheme} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          {/* Placeholder for forgot password */}
          <Route path="/forgot-password" element={<ForgetPassword/>} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
