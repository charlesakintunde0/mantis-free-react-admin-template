// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| DRAWER FOOTER - STYLED ||============================== //

const DrawerFooterStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    display: open ? 'flex' : 'none',
    width: '100%',
    alignItems: 'center',
    justifyContent: open ? 'flex-start' : 'center',
    padding: theme.spacing(open ? 3 : 0),

}));

export default DrawerFooterStyled;