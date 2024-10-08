import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { User } from "@/lib/definitions";
import { authConfig } from "./auth.config";

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    let user = null;
                    const parsedCredentials = z
                        .object({
                            email: z.string().email(),
                            password: z.string().min(6),
                        })
                        .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        user = await getUser(email);

                        if (!user) {
                            console.error("User not found.");
                            throw new Error("User not found.");
                        }

                        const passwordsMatch = await bcrypt.compare(
                            password,
                            user.password
                        );

                        if (!passwordsMatch) {
                            user = null;
                        }
                    }
                    return user;
                } catch (error) {
                    console.error("Invalid credentials");
                    return null;
                }
            },
        }),
    ],
});
