import { INTF_PaymentMethods } from '../../Interface/Payment_Methods/Payment_Methods';

export const payment_methods_data: INTF_PaymentMethods[] = [
    {
        id: 1,
        name: 'PayPal',
        logo: require('../../Images/Payment_Methods/PayPal.png'),
    },
    {
        id: 2,
        name: 'Bank Transfer',
        logo: require('../../Images/Payment_Methods/Bank_Transfer.png'),
    },
    {
        id: 3,
        name: 'Credit Card',
        logo: require('../../Images/Payment_Methods/Credit_Card.png'),
    },
    {
        id: 4,
        name: 'Google Play',
        logo: require('../../Images/Payment_Methods/Google_Play.png'),
    },
];
