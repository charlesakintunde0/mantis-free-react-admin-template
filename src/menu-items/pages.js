// assets
import {
    LoginOutlined,
    ProfileOutlined,
    MessageFilled,
    CustomerServiceFilled
} from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    MessageFilled,
    CustomerServiceFilled
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
            url: '/About',
            icon: icons.MessageFilled,
            breadcrumbs: false
        },
        {
            id: 'login1',
            title: 'Login',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: true
        },
        {
            id: 'register1',
            title: 'Register',
            type: 'item',
            url: '/registration',
            icon: icons.ProfileOutlined,
            target: true
        },

    ]
};

export default pages;
