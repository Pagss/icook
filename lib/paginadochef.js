import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { cheflink } from "./cheflink";

export default function PaginaDoChef(props) {
  const { data: session, status } = useSession();

  if (session) {
    // console.log(chefs);

    const userEm = session.user.email;
    // console.log(userEm);

    const chefArr = props.chefs.filter((chef) => chef.email === userEm);
    // console.log(chefArr);
    const id = chefArr[0]._id;
    // console.log("log do chefID");
    // console.log(chefId);
    // const id = chefId._id;
    // console.log(id);
    const router = useRouter();

    const teste = router.push(`${props.url}/chef/${id}`);
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

export async function getStaticProps(context) {
  const url = process.env.NEXTAUTH_URL;
  const chefJsonRaw = await fetch(`${process.env.NEXTAUTH_URL}/api/chefapi`);
  const chefJson = await chefJsonRaw.json();
  const chefs = JSON.parse(JSON.stringify(chefJson));

  return { props: { chefs, url } };
}
