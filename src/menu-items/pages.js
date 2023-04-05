// assets
import {
    LoginOutlined,
    ProfileOutlined,
    MessageFilled,
    CustomerServiceFilled,
    LogoutOutlined

} from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    MessageFilled,
    CustomerServiceFilled,
    LogoutOutlined

};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'pages',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'feedback',
            title: 'Feedback',
            type: 'item',
            url: '/comments',
            icon: icons.CustomerServiceFilled,
            breadcrumbs: false
        },
        {
            id: 'about',
            title: 'About',
            type: 'item',
            url: '/about',
            icon: icons.MessageFilled,
            breadcrumbs: false
        },
        {
            id: 'register',
            title: 'Register',
            type: 'item',
            url: '/register',
            icon: icons.ProfileOutlined,
            target: true
        },
        {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: true
        },

        {
            id: 'logout',
            title: 'Logout',
            type: 'item',
            url: '/logout',
            icon: icons.LogoutOutlined,
            target: true
        },

    ]
};

export default pages;
