import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const Home = () => {
  return (
    <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Cryptography Project
      </Typography>
      <Card sx={{ maxWidth: 600, margin: 'auto', padding: '1rem' }}>
        <CardContent>
          <Typography variant="body1">
            Explore various encryption techniques including SHA-1, SHA-256, AES, DES, RSA, HMAC, and MD5.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" color="primary" href="/aes">
            Get Started
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Home;
