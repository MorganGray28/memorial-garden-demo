import React, {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Login(props) {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('password');

    function handleChange(e) {
        // this.setState({ [e.target.name] : e.target.value });
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleAuthentication({username, password})
        setUsername('');
        setPassword('');
    }

    function handleAuthentication(user) {
        const auth = async () => {
            try {
                const res = await axios.get('/authenticate', { auth: {username: user.username, password: user.password} });
                console.log(res.data);
                if(res.data.screen === 'admin') {
                    props.setAuth();
                }
            } catch (e) {
                console.log(e);
                if(e.response.status) {
                    if(e.response.status === 401) {
                        alert('incorrect credentials');
                    }
                }
            }
        };
        auth();
    }

    
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#fefefe',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography variant="h4" sx={{paddingTop: '10%'}}>Memorial Garden</Typography>
            <Typography variant="subtitle1">Admin Dashboard</Typography>
            
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <TextField
                    autoComplete="off"
                    color="primary"
                    variant="standard"
                    label="Username"
                    value={username}
                    onChange={handleChange}
                    type="text"
                    name="username"
                    id="Username"
                    margin="normal"
                    sx={{width: '200px'}}
                />
                <TextField
                    variant="standard"
                    label="Password"
                    value={password}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="Password"
                    margin="normal"
                    sx={{width: '200px'}}
                />
                <Button  type="submit" color="primary" variant="contained" fullWidth sx={{marginTop: '20px'}}>Login</Button>
            </form>

        </Box>
    )
}