import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <nav>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div>
          <Link href="/paginadochef">
            <a>Chef</a>
          </Link>
        </div>
        <div>
          <button onClick={signOut}>Sair</button>
        </div>
      </nav>
    );
  }
  {
    return (
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>
    );
  }
}
