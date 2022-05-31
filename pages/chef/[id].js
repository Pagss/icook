import clientPromise from "../../lib/mongodb";

import { useRouter } from "next/router";
import { ObjectId } from "mongodb";

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db("icook");
  const dataRaw = await db.collection("users").find().toArray();
  const data = JSON.parse(JSON.stringify(dataRaw));
  //console.log(data);
  const paths = data.map((doc) => {
    return {
      params: {
        id: doc._id,
      },
    };
  });
  // console.log(paths);
  return {
    paths,
    fallback: blocking,
  };
}

export async function getStaticProps({ params }) {
  console.log("oi props [id]");
  console.log(params);
  const user = params.id;
  console.log(user);

  const client = await clientPromise;
  const db = client.db("icook");
  const chefRaw = await db.collection("users").findOne(ObjectId(user));

  console.log(chefRaw);

  const chef = JSON.parse(JSON.stringify(chefRaw));

  return {
    props: { chef },
  };
}

export default function Chef(props) {
  //console.log(props);

  const chef = props.chef;

  return (
    <div>
      <h1>{chef.name}</h1>
      <ul>
        {chef.recipes.map((receita, index) => {
          return <li key={receita}>{receita.title}</li>;
        })}
      </ul>
    </div>
  );
}
