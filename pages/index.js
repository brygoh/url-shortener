import React, { useEffect, useState } from 'react';
import { AppBar, Button, TextField, Alert, AlertTitle } from '@mui/material';
import { Link, CopyAll } from '@mui/icons-material';
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
    const URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? 'http://localhost:5000/url/': 'https://ghxb.herokuapp.com/url/'
    if (regexCheck(value)) {
      setShorten()
      setError()
      axios.post(URL + 'publish', {actualURL: value})
      .then(res => {
        setShorten(URL + res.data.shortId)
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
          for shortened link or 
          <CopyAll onClick={() => {
            navigator.clipboard.writeText(shorten); 
            alert('URL has been copied')
          }}/>
        </Alert> : null}
      </Container>
    </>
  );
}
