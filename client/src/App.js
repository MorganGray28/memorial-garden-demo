import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material';

let theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(66, 66, 244)'
    }
  }
});

theme.typography.body1 = {
  [theme.breakpoints.down('sm')]: {
    fontSize: '.8rem'
  }
}

theme.typography.h6 = {
  [theme.breakpoints.up('xs')]: {
    fontSize: '.9rem'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.1rem'
  }
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const readCookie = async () => {
      try {
        const res = await axios.get('/read-cookie');
        if (res.data.screen === 'admin') {
          setAuthenticated(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    readCookie();
  }, [])

  function setAuthentication() {
    setAuthenticated(true)
  }

  function logout() {
    const deleteCookie = async () => {
        try {
            await axios.get('/clear-cookie');
            setLogout()
        } catch (e) {
            console.log(e);
        }
    };
    deleteCookie();
}

  function setLogout() {
    setAuthenticated(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {authenticated ? 
          <Dashboard logout={logout} /> : 
          <Login setAuth={setAuthentication} />}
      </div>
    </ThemeProvider>
  )
}