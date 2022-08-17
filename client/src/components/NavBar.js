import React, { useState } from 'react'
import Search from './Search';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';

//TODO: Style the scrollbar to a slim custom bar 

export default function NavBar(props) {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const { window } = props;
    const drawerWidth = 300;
    const container = window !== undefined ? () => window().document.body : undefined;

    function handleDrawerToggle() {
        setMobileDrawerOpen(!mobileDrawerOpen);
    }

    return (
        <div>
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar
                    sx={{
                        backgroundColor: '#fefefe',
                        color:'gray'
                    }}
                >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <ManageSearchRoundedIcon />
                </IconButton>
                <Typography noWrap variant="h6" color="inherit" sx={{fontWeight:'400', flexGrow:'1', color: 'rgb(19, 33, 69)'}}>
                    Memorial Garden
                </Typography>
                    <Button variant="outlined" onClick={props.logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                component="div"
                aria-label="search plots"
                sx={{
                width: { md: drawerWidth },
                flexShrink: {md: 0},
                backgroundColor: 'slategray',
                minHeight: '100vh'
                }}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    <Toolbar sx={{justifyContent:'center'}}>
                        {/* <Typography variant="h6" sx={{fontWeight:'300'}}>Search Plots</Typography> */}
                    </Toolbar>
                    <Divider/>
                    <Search
                        data={props.data}
                        setActive={props.setActive}
                        currentActive={props.currentActive}
                    />
                </Drawer>
                <Drawer
                    variant="temporary"
                    sx={{
                        width: drawerWidth,
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open={mobileDrawerOpen}
                    onClose={handleDrawerToggle}
                    container={container}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    <Search
                        data={props.data}
                        setActive={props.setActive}
                    />
                </Drawer>
            </Box>
        </div>
    )

}