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
    id: 'app-home',
    title: 'Home',
    type: 'group',
    children: [
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/home',
            icon: icons.HomeFilled,
            breadcrumbs: false
        },

    ]
};

export default home;
