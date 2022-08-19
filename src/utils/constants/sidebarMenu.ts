import DashboardIcon from 'assets/panel/sidebar/dashboard.svg';
import ShippingIcon from 'assets/panel/sidebar/shipping.svg';
import ProductIcon from 'assets/panel/sidebar/product.svg';
import UserIcon from 'assets/panel/sidebar/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '',
        title: 'داشبورد',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: 'orders',
        title: 'سفارش ها',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: 'products',
        title: 'کالاها',
    },
    {
        id: 4,
        icon: UserIcon,
        path: 'profile',
        title: 'اکانت من',
    }
]

export default sidebar_menu;