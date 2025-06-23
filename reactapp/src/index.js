import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="501133578210-ad2ls208ucf6au3ukvcqbdor3g6mfvqs.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
