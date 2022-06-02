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
          <Link href={`/chef/${session.user._id}`}>
            <a>Livro de Receitas</a>
          </Link>
        </div>
        <div>
          <Link href="/novareceita">
            <a>Criar Receita</a>
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
