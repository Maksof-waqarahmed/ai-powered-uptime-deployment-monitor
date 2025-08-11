import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession, Session } from "next-auth";
import { prisma } from "../../prisma/db";
import { authOptions } from "./auth-config";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            image?: string | null;
            isVerified?: Date | null
        } & DefaultSession["user"];
    }
}

export { Session };

const { providers, callbacks } = authOptions;

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST }
} = NextAuth({
    adapter: PrismaAdapter(prisma),

    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login",
    },

    session: {
        strategy: "jwt"
    },

    callbacks: {
        ...callbacks,
        async jwt({ token }) {
            if (!token.sub) return null;

            const existingUser = await prisma.user.findUnique({
                where: { id: token.sub },
            });

            if (!existingUser) return null;

            token.name = existingUser.name;
            token.email = existingUser.email;
            token.verified = existingUser.emailVerified ?? null;
            token.blocked = existingUser.isBlocked;

            return token;
        },
    },

    providers,
});
