import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    const user = session.user.email;

    const client = await clientPromise;
    const db = client.db("icook");
    const dataArr = await db
      .collection("users")
      .find({ email: user })
      .project({ recipes: 1 })
      .toArray();

    // const data = dataArr[0];
    // const receitas = data.recipes;
    // .project resolveu, trazendo "_id" junto

    // console.log(dataArr);

    res.status(200).json(dataArr);
  } else {
    console.log("fora de sessao");
  }
}
