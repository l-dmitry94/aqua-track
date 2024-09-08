import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import SignIn from '@/components/shared/Auth/SignIn/SignIn';

import { authOptions } from '../api/auth/[...nextauth]/route';

const SignInPage = async () => {
    const session = await getServerSession(authOptions);

    if (session) redirect('/tracker');

    return <SignIn />;
};

export default SignInPage;
