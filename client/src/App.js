import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material';

// TODO: add active state styling for TableList
// TODO: adjust scaling of the GardenMap 
// TODO: adjust colors of svg for the sidewalk, statue, font, and maybe the landscaping
// TODO: change styling of plot state colors
// TODO: rethink styling of Search List, Search List hamburger icon, and TabGroup selections
// TODO: add statistics to garden map 
// TODO: Style Navbar
// TODO: add logo for favicon, navbar, and login page 
// TODO: style a custom scrollbar for the search list 
// TODO: adjust styling of garden map key for different plot states 
// TODO: mockup a design for a history of last x number of changes made to the database for the tab group 

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