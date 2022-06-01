import clientPromise from "../../lib/mongodb";

import { useRouter } from "next/router";
import { ObjectId } from "mongodb";

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db("icook");
  const dataRaw = await db.collection("users").find().toArray();
  const data = JSON.parse(JSON.stringify(dataRaw));
  console.log(data);
  const paths = data.map((doc) => {
    return {
      params: {
        idreceita: [doc._id],
      },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  console.log("oi props [id]");
  console.log(params);
  const user = params.idreceita[0];
  console.log(user);

  const id = params.idreceita[1];
  console.log(id);

  const client = await clientPromise;
  const db = client.db("icook");
  const chefRaw = await db.collection("users").findOne(ObjectId(user));

  // console.log(chefRaw);

  const chef = JSON.parse(JSON.stringify(chefRaw));

  return {
    props: { chef, id },
  };
}

export default function Chef(props) {
  //console.log(props);
  const router = useRouter();
  const chef = props.chef;
  console.log("ola do comp");
  console.log(chef);
  const receitaNum = props.id;

  return (
    <div>
      <h1>{chef.name}</h1>
      <h2>{chef.recipes[receitaNum].title}</h2>
      <h3>Ingredientes</h3>
      <ul>
        {chef.recipes[receitaNum].ingredientes.map((ingrediente, key) => {
          return <li key={key}>{ingrediente}</li>;
        })}
      </ul>
      <h3>Modo de Fazer</h3>
      <ul>
        {chef.recipes[receitaNum].modo.map((modo, key) => {
          return <li key={key}>{modo}</li>;
        })}
      </ul>
    </div>
  );
}
