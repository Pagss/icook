import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const body = req.body;
  console.log("body: ", body);

  const session = await getSession({ req });
  const user = session.user.email;

  const client = await clientPromise;
  const db = client.db("icook");
  const dataArr = await db
    .collection("users")
    .find("recipes")
    .filter({ email: user })
    .toArray();

  const data = dataArr[0];
  const receitas = data.recipes;

  console.log(session.user.email);
  console.log(receitas);

  res.status(200).json(receitas);
}
