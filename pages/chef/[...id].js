import clientPromise from "../../lib/mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";
import { useSession, signIn, signOut } from "next-auth/react";

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db("icook");
  const dataRaw = await db.collection("users").find().toArray();
  const data = JSON.parse(JSON.stringify(dataRaw));
  // console.log(data);
  const paths = data.map((doc) => {
    return {
      params: {
        id: [doc._id],
      },
    };
  });
  // console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  // console.log("oi props [id]");
  // console.log(params);
  const user = params.id[0];
  // console.log(user);

  const client = await clientPromise;
  const db = client.db("icook");
  const chefRaw = await db.collection("users").findOne(ObjectId(user), {
    projection: { email: 0, image: 0, emailVerified: 0 },
  });

  // console.log(chefRaw);

  const chef = JSON.parse(JSON.stringify(chefRaw));
  // const chef = {
  //   _id: chefTotal._id,
  //   name: chefTotal.name,
  //   email: chefTotal.email,
  //   recipes: chefTotal.recipes,
  // };

  console.log(chef);
  // *passa o objeto inteiro pro script !!*
  return {
    props: { chef },
    revalidate: 1,
  };
}

export default function Chef(props) {
  const { data: session, status } = useSession();

  //console.log(props);
  const router = useRouter();
  const chef = props.chef;
  // console.log("ola do comp");
  // console.log(chef);
  if (session) {
    return (
      <div>
        <h1>{chef.name}</h1>
        <div>
          {!chef.recipes ? (
            <Link href={"../novareceita"}>
              <a>Crie sua primeira receita!</a>
            </Link>
          ) : (
            <ul>
              {chef.recipes.map((receita, index) => {
                return (
                  <li key={receita}>
                    <Link
                      href={`../receita/${chef._id}/${chef.recipes.indexOf(
                        receita
                      )}`}
                    >
                      <a>{receita.title}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
  {
    return (
      <>
        <main>
          <h1 className="title">iCook</h1>
          <div className="card">
            Seja um Chef
            <br />
            <button onClick={() => signIn()}>Sign in</button>
          </div>
          <style jsx>{`
            .container {
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            footer img {
              margin-left: 0.5rem;
            }

            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            .title a {
              color: #0070f3;
              text-decoration: none;
            }

            .title a:hover,
            .title a:focus,
            .title a:active {
              text-decoration: underline;
            }

            .title {
              margin: 0;
              line-height: 1.15;
              font-size: 4rem;
            }

            .title,
            .description {
              text-align: center;
            }

            .subtitle {
              font-size: 2rem;
            }

            .description {
              line-height: 1.5;
              font-size: 1.5rem;
            }

            code {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                monospace;
            }

            .grid {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;

              max-width: 800px;
              margin-top: 3rem;
            }

            .card {
              margin: 1rem;
              flex-basis: 45%;
              padding: 1.5rem;
              text-align: left;
              color: inherit;
              text-decoration: none;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              transition: color 0.15s ease, border-color 0.15s ease;
            }

            .card:hover,
            .card:focus,
            .card:active {
              color: #0070f3;
              border-color: #0070f3;
            }

            .card h3 {
              margin: 0 0 1rem 0;
              font-size: 1.5rem;
            }

            .card p {
              margin: 0;
              font-size: 1.25rem;
              line-height: 1.5;
            }

            .logo {
              height: 1em;
            }

            @media (max-width: 600px) {
              .grid {
                width: 100%;
                flex-direction: column;
              }
            }
          `}</style>
          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}</style>
        </main>
      </>
    );
  }
}
