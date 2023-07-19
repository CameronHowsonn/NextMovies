import NextAuth, { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import CreateUser from './create-user';
import GetUser from './get-user';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    signIn: async (user) => {
      await CreateUser(user.user.id);
      return true;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        const user = await GetUser(token.uid)
          .then((res) => res.json())
          .then((res) => res.user);
        session.user.username = user.username;
      }

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
