import Link from "next/link";

const NavBar = () => {
  return (
    <nav style={{ padding: "10px 0 10px 0" }}>
      {/* WARNING layout się nie rerenderuje nawet gdy zmieniamy stronę - dziecko się rerenderuje */}
      {/* dodanie nawigacji do layoutu */}
      {/* Link zamiast a - teraz strona się NIE odświeża refreshing*/}
      <Link href="/" style={{ padding: "0 5px 0 0" }}>
        Home
      </Link>
      <Link href="/posts" style={{ padding: "0 5px 0 0" }}>
        Posts
      </Link>
    </nav>
  );
};

export default NavBar;
