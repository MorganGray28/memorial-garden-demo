import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';

const StyledTextField = styled(TextField)({
    '& .MuiInputLabel-root': {
        color: 'rgb(200, 200, 200)',
        '&.Mui-focused': {
            color:'rgb(200, 200, 250)'
        }
    },
    '& .MuiOutlinedInput-input': {
        color: 'white'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(144, 154, 176)'
        },
        '&:hover fieldset': {
            borderColor: 'rgb(235, 235, 235)'
        },
        '&.Mui-focused fieldset': {
            borderColor:'rgb(200, 200, 250)'
        },
    }
});

export default StyledTextField;