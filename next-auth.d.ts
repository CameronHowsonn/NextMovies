import 'next-auth/jwt';

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
      username?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    /** The user's role. */
    userRole?: 'admin';
    uid: string;
    username?: string;
  }
}
