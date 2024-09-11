import { FormValues } from '@/components/ui/Form/Form.types';

import instance from './axios.config';
import ENDPOINTS from './endpoints';

export const signup = async (body: FormValues) => {
    const response = await instance.post(ENDPOINTS.auth.signup, body);
    return response;
};