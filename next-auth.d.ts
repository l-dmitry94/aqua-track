// next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
    interface User {
        id?: string;
        gender?: string;
        weight?: number;
        activeTime?: number;
        volume?: number;
        publicId?: string;
    }

    interface Session {
        user: User & DefaultSession['user'];
    }
}
