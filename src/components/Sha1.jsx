import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Sha1 = () => {
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');

  const handleEncrypt = () => {
    const hashedText = CryptoJS.SHA1(text).toString();
    setHash(hashedText);
  };

  return (
    <Container sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>SHA-1 Encryption</Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Enter text"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handleEncrypt}>Encrypt</Button>
      {hash && (
        <Typography sx={{ mt: 2, wordBreak: 'break-word' }}>
          <strong>Encrypted (SHA-1):</strong> {hash}
        </Typography>
      )}
    </Container>
  );
};

export default Sha1;
