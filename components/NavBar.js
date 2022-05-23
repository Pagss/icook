import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/novareceita">
        <a>Criar Receita</a>
      </Link>
    </nav>
  );
}
