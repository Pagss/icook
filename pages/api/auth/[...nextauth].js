import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  events: {
    async signIn(message) {
      const client = await clientPromise;
      const db = client.db("icook");
      const user = message.user;
      if (message.isNewUser) {
        const newUser = await db.collection("chef").insertOne({ user });

        // function createNewUser() {
        //   const user = message.user;

        //   const JSONuser = JSON.stringify(user);
        //   const endpoint = "/api/createchef";

        //   const options = {
        //     method: "POST",

        //     headers: {
        //       "Content-Type": "application/json",
        //     },

        //     body: JSONuser,
        //   };
        //   const newUser = fetch(endpoint, options);}
      } else {
        console.log("já existe");
      }
    },
  },
});
