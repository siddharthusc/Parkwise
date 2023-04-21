import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#669c3a',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#669c3a',
    },
  }));

  export {CustomTooltip};