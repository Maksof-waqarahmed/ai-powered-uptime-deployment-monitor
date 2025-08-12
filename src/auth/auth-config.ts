import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

const nextAuthSecret = process.env.AUTH_SECRET;

export const authOptions: NextAuthConfig = {
    trustHost: true,
    secret: nextAuthSecret,
    logger: {
        error(error) {
            console.error(error);
        },
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.id?.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string;
                session.user.name = token.name || session.user.name;
                session.user.image = token.picture || session.user.image;
                session.user.email = token.email as string;
                session.user.isVerified = token.verified as Date | null;
            }
            return session;
        },
    },
};
