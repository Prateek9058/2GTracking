import { AuthOptions, Session, SessionOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  name: string;
  email: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user: User = {
          id: "1",
          name: "John Doe",
          email: credentials?.email,
        };

        return user;
      },
    }),
  ],
  session: {
    jwt: true,
  } as unknown as SessionOptions,
  callbacks: {
    async jwt(params) {
      const { token, user: user } = params;

      if (user) {
        token.id = user.id;
        token.role = user.email;
      }
      return token;
    },
    async session(params) {
      const { session, token, user } = params;

      session.user = user;
      return session;
    },
  },
};
