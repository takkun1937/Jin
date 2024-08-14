import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        // ユーザーがデータベースに存在するか確認
        const existingUser = await prisma.user.findUnique({
          where: { uid: user.id },
        });

        if (!existingUser) {
          // ユーザーが存在しない場合、新しいユーザーを作成
          await prisma.user.create({
            data: {
              uid: user.id, // Googleのsubを一意なIDとして保存
              name: user.name, // Googleの名前を保存
            },
          });
        }
        return true; // サインインを許可
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false; // サインインを拒否
      }
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
