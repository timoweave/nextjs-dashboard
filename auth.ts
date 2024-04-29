import { authConfig } from './auth.config';
import type { User } from '@lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

async function getUser(email: string): Promise<User | null> {
    try {
        const users = await sql<User>`
			SELECT * FROM users WHERE email = ${email}
		`;
        const [user] = users.rows;
        return user;
    } catch (error) {
        const message = `Failed to fetch user ${email}`;
        console.error(message, error);
        throw new Error(message);
    }
}

export async function logoutAction(formData: FormData) {
    await signOut();
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordMatch) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
});
