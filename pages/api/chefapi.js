import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const body = req.body;
  console.log("bodydaapi: ", body);

  const client = await clientPromise;
  const db = client.db("icook");
  const dataArr = await db.collection("users").find().toArray();

  console.log(dataArr);

  res.status(200).json(dataArr);
}
