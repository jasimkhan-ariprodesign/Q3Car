import {_drawerMenuIcons} from '../assets/icons';
import {SCREENS} from '../misc';

export const DRAWER_MENU_LIST = [
  {
    id: '1',
    title: 'My rides',
    icon: _drawerMenuIcons.myRides, // replace with actual icon path
    screenName: 'MyRidesScreen',
    // routeName: 'MyRides',
  },
  {
    id: '2',
    title: 'Promotion',
    icon: _drawerMenuIcons.promotion,
    screenName: 'PromotionScreen',
    // routeName: 'Promotion',
  },
  {
    id: '3',
    title: 'My favorites',
    icon: _drawerMenuIcons.myFavorites,
    screenName: 'FavoritesScreen',
    // routeName: 'MyFavorites',
  },
  {
    id: '4',
    title: 'My payment',
    icon: _drawerMenuIcons.myPayment,
    screenName: 'PaymentScreen',
    // routeName: 'MyPayment',
  },
  {
    id: '5',
    title: 'Notification',
    icon: _drawerMenuIcons.notification,
    screenName: 'NotificationScreen',
    // routeName: 'Notifications',
  },
  {
    id: '6',
    title: 'Support',
    icon: _drawerMenuIcons.support,
    screenName: 'SupportScreen',
    // routeName: 'Support',
  },
  {
    id: '7',
    title: 'History',
    icon: _drawerMenuIcons.myRides,
    screenName: 'HistoryScreen',
    routeName: SCREENS.historyScreen,
  },
];

export const SP_DRAWER_MENU_LIST = [
  {
    id: '1',
    title: 'Completed Trips',
    icon: _drawerMenuIcons.myRides, // replace with actual icon path
    screenName: 'MyRidesScreen',
    // routeName: 'MyRides',
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
    // routeName: 'MyFavorites',
  },
];
