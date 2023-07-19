import { db } from "@/lib/db";
import { env } from "@/env.mjs";

import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // @ts-expect-error Nullable Adapter
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
