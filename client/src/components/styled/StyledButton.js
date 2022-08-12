import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)((props) => ({
    color: 'rgb(230, 230, 230)',
    padding: '10px 30px',
    textTransform: 'none',
    fontWeight: '400'
}));

export default StyledButton;