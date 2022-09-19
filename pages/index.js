import React, { useState } from 'react';
import { AppBar, Button, TextField, Alert, AlertTitle } from '@mui/material';
import { Link } from '@mui/icons-material';
import { Container } from '@mui/system';
import axios from 'axios';

export default function Home() {
  const [error, setError] = useState();
  const [shorten, setShorten] = useState();
  const [url, setUrl] = useState('');

  const regexCheck = (value) => {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    if (value.match(expression)) return true
    return false
  }

  const publishURL = (value) => {
    if (regexCheck(value)) {
      setShorten()
      setError()
      axios.post('http://localhost:5000/url/publish', {actualURL: value})
      .then(res => {
        setShorten(res.data.shortURL)
        console.log('here')
      })
      .catch(err => console.log(err))
    } else {
      setShorten()
      setError('URL is wrongly formatted! ')
    }
  }

  return (
    <>
      <AppBar className='index-appbar' color="primary">
        <span className='index-appbar-title'>
          <Link style={{ fontSize: '40px', marginRight: '8px' }} />
          URL Shortener
        </span>
      </AppBar>
      <Container className='index-container' maxWidth="lg">
        <span className='index-textfield' style={{fontSize: '20px'}}>
          <b>Enter URL below:</b><br/>
          <span style={{fontSize: '12px'}}>eg. protocol (http://) + hostname (www.youtube.com)</span>
        </span>
        <TextField
          className='index-textfield'
          id="outlined-basic"
          label="Enter URL here"
          variant="outlined"
          defaultValue={url}
          size="small"
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {if (e.code === 'Enter') publishURL(url)}}
          sx={{marginTop: '8px'}}
        />
        <span className='index-textfield' style={{fontSize: '12px', color:'red'}}>{error}</span>
        <Button 
          sx={{marginTop: '12px'}}
          variant="contained"
          disabled={url === ''}
          onClick={() => publishURL(url)}
        >Submit</Button>
        {shorten ? 
        <Alert severity="success" className='index-success'>
          <AlertTitle>Success</AlertTitle>
          This is a success alert — 
          <strong>
            <a href={shorten} target="_blank" rel="noopener noreferrer">click here </a>
          </strong>
          for shortened link
        </Alert> : null}
      </Container>
    </>
  );
}
