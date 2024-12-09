import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'SHA-1', path: '/sha1' },
    { name: 'SHA-256', path: '/sha256' },
    { name: 'AES', path: '/aes' },
    { name: 'DES', path: '/des' },
    { name: 'RSA', path: '/rsa' },
    { name: 'HMAC', path: '/hmac' },
    { name: 'MD5', path: '/md5' },
  ];

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Cryptography Project
        </Typography>
        {navItems.map((item) => (
          <Button key={item.name} color="inherit" component={Link} to={item.path}>
            {item.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
