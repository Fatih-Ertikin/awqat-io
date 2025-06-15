import NextAuth, { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import dbClient from "@/server/mongo/mongo-client";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(dbClient),
  providers: [],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
