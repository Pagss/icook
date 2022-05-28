import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Compartilhe receitas" />

        <meta name="og:title" content="iCook" />
      </Head>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
