import { Box } from '@mui/system';
import React from 'react';

export default function SearchList(props) {
    function handleClick(e) {
        props.setActive(props.id);
    }

    return (
        <Box p={1} sx={{display: 'flex', justifyContent:'space-between', borderBottom:'1px solid #525252', '&:hover': {cursor:'pointer', backgroundColor:'#eee'}}} onClick={handleClick}>
            <span style={{paddingLeft:'15px'}} className="SearchList-category">{props.headstone ? props.headstone : 'N/A'}</span>
            <span style={{paddingRight:'15px'}} className="SearchList-category">{props.location}</span>
        </Box>
    )
}