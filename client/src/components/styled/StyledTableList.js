import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const StyledTableList = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'default',
    '&:hover': {
        backgroundColor: 'rgba(180, 180, 220, .1)'
    },
    padding: '10px',
    borderRadius: '5px 5px 0 0',
    borderBottom: '1px solid rgb(189, 200, 240)',
    '@media print': {
        borderBottom: 'none'
    }
});

export default StyledTableList;