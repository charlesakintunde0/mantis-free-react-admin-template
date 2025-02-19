// material-ui
import { useTheme } from '@mui/material/styles';

import logo from 'assets/images/logo.png';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';

 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (

        <>
            <img src={logo}
                alt="Mantis" width="100" />

        </>
    );
};

export default Logo;
