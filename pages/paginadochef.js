import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { cheflink } from "../lib/cheflink";

export default function PaginaDoChef({ chefs }) {
  const { data: session, status } = useSession();

  if (session) {
    console.log(chefs);

    const userEm = session.user.email;
    console.log(userEm);

    const chefArr = chefs.filter((chef) => chef.email === userEm);
    console.log(chefArr);
    const id = chefArr[0]._id;
    console.log("log do chefID");
    // console.log(chefId);
    // const id = chefId._id;
    console.log(id);
    const router = useRouter();

    router.push(`/chef/${id}`);
    return (
      <div>
        <div>...Loading</div>
      </div>
    );
  }
  {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
}

export async function getStaticProps() {
  const chefJsonRaw = await fetch("http://localhost:3000/api/chefapi");
  const chefJson = await chefJsonRaw.json();
  const chefs = JSON.parse(JSON.stringify(chefJson));

  return { props: { chefs } };
}
