import { ICONS } from '../assets';
import { _drawerMenuIcons } from '../assets/icons';
import { SCREENS } from '../misc';

export const DRAWER_MENU_LIST = [
  {
    id: '1',
    title: 'My rides',
    icon: _drawerMenuIcons.myRides,
    routeName: '',
  },
  {
    id: '2',
    title: 'Promotion',
    icon: _drawerMenuIcons.promotion,
    routeName: '',
  },
  {
    id: '3',
    title: 'My favorites',
    icon: _drawerMenuIcons.myFavorites,
    routeName: '',
  },
  {
    id: '4',
    title: 'My payment',
    icon: _drawerMenuIcons.myPayment,
    routeName: '',
  },
  {
    id: '5',
    title: 'Notification',
    icon: _drawerMenuIcons.notification,
    routeName: '',
  },
  {
    id: '6',
    title: 'Support',
    icon: _drawerMenuIcons.support,
    routeName: '',
  },
  {
    id: '7',
    title: 'History',
    icon: _drawerMenuIcons.myRides,
    screenName: 'HistoryScreen',
    routeName: SCREENS.historyScreen,
  },
  {
    id: '8',
    title: 'Logout',
    icon: ICONS.logOut,
    routeName: 'Logout',
  },
];

export const SP_DRAWER_MENU_LIST = [
  {
    id: '1',
    title: 'Completed Trips',
    icon: _drawerMenuIcons.myRides,
    screenName: 'MyRidesScreen',
  },
  {
    id: '2',
    title: 'Earnings History',
    icon: _drawerMenuIcons.promotion,
    screenName: 'PromotionScreen',
    routeName: SCREENS.SPEarningHistory,
  },
  {
    id: '3',
    title: 'Ratings & Feedback',
    icon: _drawerMenuIcons.myFavorites,
    screenName: 'FavoritesScreen',
  },
  {
    id: '4',
    title: 'Logout',
    icon: ICONS.logOut,
    routeName: 'Logout',
  },
];
