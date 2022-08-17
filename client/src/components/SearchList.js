import { Box } from '@mui/system';
import React from 'react';

export default function SearchList(props) {
    function handleClick(e) {
        props.setActive(props.id);
    }

    let backgroundStyle;
    if (props.currentActive) {
        if (props.currentActive.id === props.location) {
            backgroundStyle = '#E3F0FF';
        } else {
            backgroundStyle = '';
        }
    }

    return (
        <Box p={1} sx={{display: 'flex', backgroundColor: backgroundStyle, justifyContent:'space-between', borderBottom:'1px solid rgb(140,140,140)', '&:hover': {cursor:'pointer', backgroundColor:'#F2F7FD'}}} onClick={handleClick}>
            <span style={{paddingLeft:'15px'}} className="SearchList-category">{props.headstone ? props.headstone : 'N/A'}</span>
            <span style={{paddingRight:'15px'}} className="SearchList-category">{props.location}</span>
        </Box>
    )
}