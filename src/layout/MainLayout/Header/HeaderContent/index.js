// material-ui
import { Box, IconButton, Link, useMediaQuery } from '@mui/material';
import { LogoutOutlined, } from '@ant-design/icons';


// react router
import { useNavigate } from 'react-router-dom';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';



//antd 
import Logout from './HeaderComponents/Logout';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const userDetails = JSON.parse(localStorage.getItem('user'))

    return (
        <>

            {!matchesXs && <Search />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            {/* {userDetails !== null ?
                <Logout /> : ''
            } */}
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
