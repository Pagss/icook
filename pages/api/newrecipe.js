import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const body = req.body;
  console.log("body: ", body);

  if (!body.chef) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: null });
  }
  {
    const chef = body.chef;
    const newRecipe = body.recipe;

    const client = await clientPromise;
    const db = client.db("icook");

    db.collection("users").updateOne(
      { email: chef },
      { $push: { recipes: newRecipe } }
    );

    res.status(200).json({ data: "Receita Anotada" });
  }
}
