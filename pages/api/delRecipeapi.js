import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const body = req.body;
  // console.log("body: ", body);

  if (!body.index) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: null });
  }
  const index = body.index;
  const id = body.chef;
  const delIndex = `recipes.${index}`;

  const client = await clientPromise;
  const db = client.db("icook");

  const tira = await db
    .collection("users")
    .updateOne({ _id: ObjectId(id) }, { $unset: { [delIndex]: 1 } });

  const puxa = await db
    .collection("users")
    .updateOne({ _id: ObjectId(id) }, { $pull: { recipes: null } });

  const xuxa1 = await tira;
  const xuxa2 = await puxa;
  // const tenteiJS = await db
  //   .collection("users")
  //   .find({ _id: ObjectId(id) }, { project: { recipes: 1 } })
  //   .toArray();
  // // console.log(tenteiJS);

  // const praDel = tenteiJS[0].recipes[parseInt(index)].title.toString();

  // console.log(praDel);

  // db.collection("users").updateOne(
  //   { _id: ObjectId(id) },
  //   { $unset: { receitas: 1 } },
  //   { arrayFilters: [{ "receita.title": praDel }] }
  // );

  // db.collection("users").updateOne(
  //   { _id: ObjectId(id) },
  //   { $pull: { recipes: { title: praDel } } }
  // );

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: "foi" });
}
