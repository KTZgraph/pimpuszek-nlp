// do wywoływania funckji, któa pobiera dane
import { use } from "react";

// WARNING - nazwa folder [id] bo to dynamiczne, ale plik page.js
// wyświetlanie posta po jego id - id  jest z urla

async function getPost(id) {
  let post = await fetch(`https://dummyjson.com/posts/${id}`);
  return post.json();
}

const page = ({ params }) => {
  let id = params.id;
  let post = use(getPost(id));

  return (
    <div>
      <p>{post.title}</p>
      <p>{post.body}</p>
    </div>
  );
};

export default page;
