// select car type screen temp data
export const _vehicleTypes = [
  {
    id: 'small_car',
    title: 'SMALL CAR',
    subtitle: 'Best Save',
    timeEstimate: '1-4 min',
    image: require('../assets/icons/small-car.png'),
    isSelected: true,
  },
  {
    id: 'suv_car',
    title: 'SUV CAR',
    subtitle: '7 Seats',
    timeEstimate: '1-5 min',
    image: require('../assets/icons/suv-car.png'),
    isSelected: false,
  },
  {
    id: 'truck',
    title: 'TRUCK',
    subtitle: 'Pay Less',
    timeEstimate: '1-5 min',
    image: require('../assets/icons/truck.png'),
    isSelected: false,
  },
];

// search screen temp data
export const _recentPlaces = [
  {
    id: '1',
    title: 'Office',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    distance: '2.7km',
  },
  {
    id: '2',
    title: 'Coffee shop',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    distance: '1.1km',
  },
  {
    id: '3',
    title: 'Shopping center',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    distance: '4.9km',
  },
  {
    id: '4',
    title: 'Shopping mall',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    distance: '4.0km',
  },
  {
    id: '5',
    title: 'Shopping mall',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    distance: '4.0km',
  },
];

export const HISTORY_DATA = [
  {
    id: '1',
    title: 'La Plata',
    dateTime: '26 Mar-11:20 PM',
    price: '$20.00',
    // image: require('./assets/towing-truck.png'), // replace with your local image path
  },
  {
    id: '2',
    title: 'La Plata',
    dateTime: '26 Mar-11:20 PM',
    price: '$20.00',
    // image: require('./assets/delivery-truck.png'), // replace with your local image path
  },
];


export const EarningsHistoryData = [
  {
    id: '1',
    type: 'Groceries',
    amount: 120,
    date: 'Yesterday at 16:34',
    icon: 'G', // for the circle avatar
    iconColor: '#FFE5E5', // light red background
  },
  {
    id: '2',
    type: 'Gas',
    amount: 205,
    date: 'Yesterday at 13:03',
    icon: 'G',
    iconColor: '#FFE5E5',
  },
  {
    id: '3',
    type: 'Sneaker sales',
    amount: 859,
    date: 'Yesterday at 16:34',
    icon: 'S',
    iconColor: '#DFFFE8', // light green background
  },
  {
    id: '4',
    type: 'Gym',
    amount: 20,
    date: 'Wed, 01 Nov 2023 at 09:10',
    icon: 'G',
    iconColor: '#FFE5E5',
  },
];
