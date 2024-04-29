import { authConfig } from './auth.config';
import NextAuth from 'next-auth';

const nextAuth = NextAuth(authConfig);

export default nextAuth.auth;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
