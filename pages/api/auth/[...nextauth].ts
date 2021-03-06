import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: NextAuthOptions = {
  providers: [
    Providers.FusionAuth({
      name: 'FusionAuth',
      domain: process.env.FUSIONAUTH_DOMAIN,
      clientId: process.env.FUSIONAUTH_CLIENT_ID,
      clientSecret: process.env.FUSIONAUTH_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  session: { jwt: true },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      user && (token.user = user);
      return token;
    },
    //@ts-ignore
    async session(session, token) {
      session.user = {
        ...session.user,
        //@ts-ignore
        ...token.user
      };
      return session;
    }
  },
  pages: {
    newUser: '/auth/complete-signup',
    signIn: '/auth/signin'
  }
};
