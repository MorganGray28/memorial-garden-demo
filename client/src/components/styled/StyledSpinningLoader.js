import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";

const spin = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

const StyledSpinningLoader = styled('div')({
    width: '120px',
    height: '120px',
    border: '3px solid rgba(150,150,150, .3)',
    borderTopColor: 'rgb(83, 190, 242)',
    borderRadius: '50%',
    animation: `${spin} 1.2s linear infinite`
})

export default StyledSpinningLoader;