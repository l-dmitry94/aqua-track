import { FormValues } from '@/components/ui/Form/Form.types';

import instance from '../axios.config';
import ENDPOINTS from '../endpoints';

export const signup = async (body: FormValues) => {
    const response = await instance.post(ENDPOINTS.auth.signup, body);
    return response;
};

export const update = async (body: FormValues) => {
    const response = await instance.patch(ENDPOINTS.auth.update, body);
    return response;
};

export const removeImage = async (publicId: string) => {
    const response = await instance.post(ENDPOINTS.auth.removeAvatar, { publicId });
    return response;
};

export const verifyToken = async (token: string) => {
    const response = await instance.post(ENDPOINTS.auth.verifyToken, { token });
    return response;
};

export const fetchTotalUsers = async () => {
    const { data } = await instance.get('/users');
    return data;
};
