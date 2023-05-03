import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import './index.css'

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    CardContent,
    ClickAwayListener,
    Grid,
    IconButton,
    Paper,
    Popper,
    Stack,
    Tab,
    Tabs,
    Typography
} from '@mui/material';

// router
import { Link } from 'react-router-dom';

//api 
import { useUserLogOutMutation } from 'api/userApi';

// antd
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons';

// redux
import { useNavigate } from 'react-router'

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';

// assets
import { LogoutOutlined, SettingOutlined, UserOutlined, UpOutlined } from '@ant-design/icons';
import { Notification } from 'components/Notifications/Notification';
import userRole from 'Constants/userRole';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

// CSS Style
const linkStyle = {
    color: 'inherit',  // Set color to inherit from parent element
    textDecoration: 'none', // Remove underline
    padding: 20,
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
    const theme = useTheme();
    const [isIconUp, setIsIconUp] = useState(true);
    const [userLogOut, { isSuccess }] = useUserLogOutMutation();
    const userDetails = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();

    const [user, setUser] = useState(userDetails ? {
        userName: userDetails.uFirstName + ' ' + userDetails.uLastName,
        role: userDetails.uRole
    } : null
    );

    const handleLogout = () => {

        userLogOut().unwrap().then(() => {
            Notification('success', "Operation Successful", "Logout Success");
            navigate('/login');
            window.location.reload();
        }).catch((err) => {
            console.error(err);
            Notification('error', "Error Occured", err.toString());
        });
        localStorage.removeItem('user');



    }

    function handleClick(event) {
        // do something else, like navigate programmatically
        navigate('/login');
        window.location.reload();
    }


    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        setIsIconUp(!isIconUp);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setIsIconUp(!isIconUp);
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const iconBackColorOpen = 'grey.300';



    console.log(userDetails)
    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>

            {
                user ?
                    <ButtonBase
                        sx={{
                            p: 0.25,
                            bgcolor: open ? iconBackColorOpen : 'transparent',
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'secondary.lighter' }
                        }}
                        aria-label="open profile"
                        ref={anchorRef}
                        aria-controls={open ? 'profile-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        className="icon-change-button"
                    >
                        {userDetails ?
                            <Stack onClick={handleClose} direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                                <Typography variant="subtitle1">{user.userName}

                                </Typography>
                                <Box className={`icon ${isIconUp ? "up" : "down"}`}>
                                    {isIconUp ? <UpOutlined /> : <DownOutlined />}
                                </Box>


                            </Stack>
                            :
                            ''
                        }
                    </ButtonBase>
                    :

                    <ButtonBase
                        sx={{
                            p: 1,
                            bgcolor: open ? iconBackColorOpen : 'transparent',
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'secondary.lighter' }
                        }}
                        aria-label="open profile"
                        ref={anchorRef}
                        aria-haspopup="true"
                        className="icon-change-button"
                        onClick={handleClick}
                    >
                        <Typography variant="paragraph">
                            <InfoCircleOutlined style={{ marginRight: '8px', color: '#f57f17' }} />
                            {'Please sign in'}
                        </Typography>
                    </ButtonBase>
            }

            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && (
                            <Paper
                                sx={{
                                    boxShadow: theme.customShadows.z1,
                                    width: 290,
                                    minWidth: 240,
                                    maxWidth: 290,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 250
                                    }
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard elevation={0} border={false} content={false}>
                                        <CardContent sx={{ px: 2.5, pt: 3 }}>
                                            <Grid container justifyContent="space-between" alignItems="center">
                                                <Grid item>
                                                    <Stack direction="row" spacing={1.25} alignItems="center">
                                                        <Stack>
                                                            <Typography variant="h6">{user.userName}</Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {user.role}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton size="large" color="secondary" onClick={handleLogout}>
                                                        <LogoutOutlined />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        {open && (
                                            <>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs
                                                        variant="fullWidth"
                                                        value={value}
                                                        onChange={handleChange}
                                                        aria-label="profile tabs"
                                                    >
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Profile"
                                                            {...a11yProps(0)}
                                                        />
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Setting"
                                                            {...a11yProps(1)}
                                                        />
                                                    </Tabs>
                                                </Box>
                                                {
                                                    user.role === userRole.ADMIN
                                                        ?
                                                        <TabPanel value={value} index={0} dir={theme.direction}>

                                                            <ProfileTab handlePopperClose={handleClose} handleLogout={handleLogout} />

                                                        </TabPanel>
                                                        :
                                                        ""

                                                }
                                            </>
                                        )}
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        )}
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Profile;
