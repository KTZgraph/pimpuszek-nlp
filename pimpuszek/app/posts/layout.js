// WARNING - koponenty w folderze app sa defaultowo komponentami serwerowymi

// teraz zamiast nazw plików mamy foldery - pl;ik page.js musi wystąpić
// zxamiast propsów - to use z reacta do pobierania danych w kopomenecie
import Link from "next/link";
import { use } from "react";

async function getPosts() {
  setTimeout(() => {
    // console.log("Wait - wyświetli się w konsoli !");
  }, 5000);

  let posts = await fetch("https://dummyjson.com/posts?limit=3");

  return posts.json();
}

const Layout = ({children}) => {
  let { posts } = use(getPosts());

  return (
    <div>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
