import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("icook");
  const data = await db.collection("recipes").find().toArray();
  res.json(data);
}
