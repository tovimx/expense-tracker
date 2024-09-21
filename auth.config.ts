import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async authorized({ request, auth }) {
            const url = request.nextUrl;
            if (request.method === "POST" && url.pathname !== "/login") {
                const isLoggedIn = !!auth?.user;
                if (isLoggedIn) return true;
                return NextResponse.json("Invalid auth token", { status: 401 });
            }

            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth?.user;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
