// WARNING - koponenty w folderze app sa defaultowo komponentami serwerowymi

// teraz zamiast nazw plików mamy foldery - pl;ik page.js musi wystąpić
// zxamiast propsów - to use z reacta do pobierania danych w kopomenecie
import { use } from "react";

async function getPosts() {
  let posts = await fetch("https://dummyjson.com/posts?limit=3");

  return posts.json();
}

const page = () => {
  let posts = use(getPosts());
  //   wyświetla sie w konsoli serwera - ten komponent działa jako server komponent
  console.log(posts);

  return (
    <div>
      <h1>Post page</h1>
    </div>
  );
};

export default page;
