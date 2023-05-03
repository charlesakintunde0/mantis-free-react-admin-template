import React from 'react'
// material-ui
import { Box, IconButton, Link, useMediaQuery } from '@mui/material';

//api
import { useUserLogOutMutation } from 'api/userApi'

import { LogoutOutlined, } from '@ant-design/icons';

// react router
import { useNavigate } from 'react-router-dom';

import { Notification } from 'components/Notifications/Notification';

const Logout = () => {
    const [userLogOut, { isLoading, isSuccess, isError, error }] = useUserLogOutMutation();


    const navigate = useNavigate();
    const handleLogout = () => {
        userLogOut().unwrap().then(() => {
            localStorage.removeItem('user');
            Notification('success', "Operation Successful", "Logout Success");
            navigate('/login');
            window.location.reload()
        }).catch((err) => {
            console.error(err);
            Notification('error', "Error Occured", err.toString());
        });
    }
    return (
        <IconButton
            target="_blank"
            disableRipple
            color="secondary"
            title="Logout"
            onClick={handleLogout}
            sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
        >
            <LogoutOutlined />
        </IconButton>
    )
}

export default Logout