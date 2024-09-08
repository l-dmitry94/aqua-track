import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import SignUp from '@/components/shared/Auth/SignUp';

import { authOptions } from '../api/auth/[...nextauth]/route';

const SignUpPage = async () => {
    const session = await getServerSession(authOptions);

    if (session) redirect('/tracker');

    return <SignUp />;
};

export default SignUpPage;
