import React, { useState } from 'react';
import { AppBar, TextField } from '@mui/material';
import { Link } from '@mui/icons-material';
import { Container } from '@mui/system';

export default function Home() {
  const [url, setUrl] = useState('');

  return (
    <>
      <AppBar
        color="primary"
        sx={{
          minWidth: '320px',
          height: '64px',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <span
          style={{
            height: '100%',
            fontSize: '20px',
            fontWeight: '600',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Link style={{ fontSize: '40px', marginRight: '8px' }} />URL Shortener
        </span>
      </AppBar>
      <Container sx={{ marginTop: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: `calc(100vh - 64px)` }} maxWidth="lg">
        <TextField
          id="outlined-basic"
          label="Enter URL here"
          variant="outlined"
          defaultValue={url}
          size="small"
          onChange={(e) => setUrl(e.target.value)}
        />
      </Container>
    </>
  );
}
