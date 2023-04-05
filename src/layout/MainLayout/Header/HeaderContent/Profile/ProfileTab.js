import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// componenet
import UsersTable from 'pages/admin-dashboard/UsersTables';

// redux
import { useDispatch, useSelector } from 'react-redux';

//reducers
import { openUserModal } from 'store/reducers/usersModal';

// assets
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handlePopperClose }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    // const isUser = JSON.parse(localStorage.get('user'))
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {

        setSelectedIndex(index);

        if (index === 0) {
            handleManageUsers();
        }
        handlePopperClose();
    };

    const handleManageUsers = () => {

        dispatch(openUserModal());

    }

    return (
        <>
            <UsersTable />
            <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>

                <ListItemButton selected={selectedIndex === 0} onClick={(event) => { handleListItemClick(event, 0) }}>
                    <ListItemIcon>
                        <EditOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Manage Users" />
                </ListItemButton>

            </List>
        </>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func
};

export default ProfileTab;
