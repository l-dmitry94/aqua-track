import {
    customer_1_1x,
    customer_1_2x,
    customer_2_1x,
    customer_2_2x,
    customer_3_1x,
    customer_3_2x,
} from '@/public/images/advantages';

const customers = [
    {
        src: customer_1_1x.src,
        srcSet: `${customer_1_1x.src} 1x, ${customer_1_2x.src} 2x`,
        alt: 'Customer 1',
    },
    {
        src: customer_2_1x.src,
        srcSet: `${customer_2_1x.src} 1x, ${customer_2_2x.src} 2x`,
        alt: 'Customer 2',
    },
    {
        src: customer_3_1x.src,
        srcSet: `${customer_3_1x.src} 1x, ${customer_3_2x.src} 2x`,
        alt: 'Customer 3',
    },
];

export default customers;
