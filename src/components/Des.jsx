import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Des = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleEncrypt = () => {
    const ciphertext = CryptoJS.DES.encrypt(text, key).toString();
    setEncrypted(ciphertext);
  };

  const handleDecrypt = () => {
    const bytes = CryptoJS.DES.decrypt(encrypted, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    setDecrypted(originalText);
  };

  return (
    <Container sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>DES Encryption</Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Enter text"
          variant="outlined"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Enter key"
          variant="outlined"
          fullWidth
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </Box>
      <Button variant="contained" sx={{ mr: 1 }} onClick={handleEncrypt}>Encrypt</Button>
      <Button variant="outlined" onClick={handleDecrypt}>Decrypt</Button>
      {encrypted && (
        <Typography sx={{ mt: 2, wordBreak: 'break-word' }}>
          <strong>Encrypted:</strong> {encrypted}
        </Typography>
      )}
      {decrypted && (
        <Typography sx={{ mt: 2, wordBreak: 'break-word' }}>
          <strong>Decrypted:</strong> {decrypted}
        </Typography>
      )}
    </Container>
  );
};

export default Des;
