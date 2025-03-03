import React from 'react';
import Chat from './components/Chat.jsx';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>AI Chatbot</h1>
      <Chat />
    </Container>
  );
}

export default App;