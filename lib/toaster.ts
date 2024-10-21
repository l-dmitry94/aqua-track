import { DefaultToastOptions } from 'react-hot-toast';

const toastOptions: DefaultToastOptions = {
    duration: 3000,
    error: {
        style: {
            background: '#f44336',
            color: '#fff',
        },
    },
    success: {
        style: {
            background: '#4caf50',
            color: '#fff',
        },
    },
};

export default toastOptions;
