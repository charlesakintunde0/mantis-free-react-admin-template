// assets
import {
    HomeFilled,
    MessageFilled,
    CustomerServiceFilled
} from '@ant-design/icons';

// icons
const icons = {
    HomeFilled,
    MessageFilled,
    CustomerServiceFilled
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const home = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/',
            icon: icons.HomeFilled,
            breadcrumbs: false
        },
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
    ]
};

export default home;
