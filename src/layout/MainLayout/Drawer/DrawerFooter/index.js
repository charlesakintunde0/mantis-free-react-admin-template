import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Stack,
    // Button

} from '@mui/material';


import AnimateButton from 'components/@extended/AnimateButton';

import { Button } from 'antd'

// redux
import { useNavigate } from 'react-router'

// notifications
import { Notification } from 'components/Notifications/Notification';

// api
import { useUserLogOutMutation, } from 'api/userApi';

// antd icons
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons'

// project import
import DrawerFooterStyled from './DrawerFooterStyled';

const buttonStyle = {
    color: '#1DA1F2',
    borderColor: '#1DA1F2',
    width: '100%',
};

// ==============================|| DRAWER HEADER ||============================== //

const DrawerFooter = ({ open }) => {
    const theme = useTheme();
    const [userLogOut, { isSuccess }] = useUserLogOutMutation();
    const userDetails = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();

    const handleLogout = () => {

        userLogOut().unwrap().then(() => {
            Notification('success', "Operation Successful", "Logout Success");
            navigate('/login');

            // Add a delay before reloading the window
            setTimeout(() => {
                window.location.reload();
            }, 1000); // Delay in milliseconds
        }).catch((err) => {
            console.error(err);
            Notification('error', "Error Occured", err.toString());
        });

        localStorage.removeItem('user');
    }


    return (
        <DrawerFooterStyled theme={theme} open={open}>
            <Stack direction="row" spacing={1} alignItems="center">
                {

                    <AnimateButton
                    >
                        {userDetails ?
                            <Button
                                onClick={handleLogout}
                                style={buttonStyle}
                                ghost
                                type='primary'
                                icon={<LogoutOutlined />}>
                                {'Logout'}
                            </Button>
                            :
                            // <Button
                            //     onClick={navigate('/login')}
                            //     style={buttonStyle}
                            //     ghost
                            //     type='primary'
                            //     icon={<LoginOutlined />}>
                            //     {'Login'}
                            // </Button>
                            ""}
                    </AnimateButton>

                }
            </Stack>
        </DrawerFooterStyled >
    );
};

DrawerFooter.propTypes = {
    open: PropTypes.bool
};

export default DrawerFooter;