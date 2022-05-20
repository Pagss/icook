import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }) {
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
