// WARNING - koponenty w folderze app sa defaultowo komponentami serwerowymi

// teraz zamiast nazw plików mamy foldery - pl;ik page.js musi wystąpić
// zxamiast propsów - to use z reacta do pobierania danych w kopomenecie
import { use } from "react";

async function getPosts() {
  let posts = await fetch("https://dummyjson.com/posts?limit=3");

  return posts.json();
}

const page = () => {
  let { posts } = use(getPosts());

  return (
    <div>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default page;
