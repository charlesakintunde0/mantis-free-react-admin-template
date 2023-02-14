// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
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
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'feedback',
            title: 'Feedback',
            type: 'item',
            url: '/comments',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'about',
            title: 'About',
            type: 'item',
            url: '/About',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
    ]
};

export default home;
