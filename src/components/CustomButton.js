import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const GreenButton = styled(Button)({
    backgroundColor: '#669c3a',
    '&:hover': {
        backgroundColor: '#f1f9e2',
        color: '#669c3a'
    }
});

export {GreenButton}