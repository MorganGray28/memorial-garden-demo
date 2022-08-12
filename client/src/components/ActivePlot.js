import React from 'react';
import StyledButton from '../components/styled/StyledButton';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function ActivePlot(props) {
    function handleClick() {
        props.toggleEditing();
    }

    let content;
    if (props.data) {
        content = (
            <>
                <Grid container spacing={3} mb={3}>
                    <Grid item xs={6} sm={6} md={4}>
                        <Typography variant="h6">Location: <span>{props.data && props.data.location}</span></Typography>
                    </Grid>   
                    <Grid item xs={6} sm={6} md={4}>
                        <Typography variant="h6">Headstone: <span>{props.data && props.data.headstone}</span></Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4}>
                        <Typography variant="h6">Reserved for: <span>{props.data && props.data.reserved}</span></Typography>  
                    </Grid>
                    <Grid item xs={6} sm={6} md={4}>
                        <Typography variant="h6">Plot Status: <span>{props.data && props.data.plotFilledStatus}</span></Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4}>
                        <Typography variant="h6">Plot Number: <span>{props.data && props.data.plot}</span></Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4}>
                        <Typography variant="h6">Comments: <span>{props.data && props.data.comments}</span></Typography>
                    </Grid>
                </Grid>
                <StyledButton variant="contained" onClick={handleClick} disabled={!props.data}>Edit</StyledButton>
            </>
        )
    }
    
    return (
        <>
            <Box flexGrow={1} sx={{ backgroundColor: 'rgb(19, 33, 69)', color: 'white', borderRadius: '12px', padding: '20px', minHeight:'220px' }}>
                <Typography mb={3} variant='h5' textAlign='center' fontWeight={300} color='rgb(144, 154, 176)'>{ props.data ? 'Selected Plot' : 'Select a Plot'}</Typography>
                {content}
            </Box>
        </>
    )
}