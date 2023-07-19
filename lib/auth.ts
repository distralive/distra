import { db } from "@/lib/db";

import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  // @ts-expect-error Nullable Adapter
  adapter: PrismaAdapter(db),
  providers: [],
};
