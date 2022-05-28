import { useSession, signIn } from "next-auth/react";

export default function PaginaDoChef() {
  const { data: session, status } = useSession();

  if (session) {
    const chef = session.user.name;

    // const getData = async () => {
    //   let recps = await fetch("/api/recipebook");
    //   return await recps;
    // };
    // console.log(recps);
    const lista = console.log("oi");

    return (
      <div>
        <div>Receitas do {chef}</div>
        <ul></ul>
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
