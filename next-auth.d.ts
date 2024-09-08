// next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
    interface User {
        gender?: string;
        weight?: number;
        activeTime?: number;
        volume?: number;
    }

    interface Session {
        user: {
            id?: string;
            gender?: string;
            weight?: number;
            activeTime?: number;
            volume?: number;
        } & DefaultSession['user'];
    }
}
