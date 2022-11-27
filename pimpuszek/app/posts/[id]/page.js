// WARNING - nazwa folder [id] bo to dynamiczne, ale plik page.js
// wyświetlanie posta po jego id - id  jest z urla

const page = ({ params }) => {
  let id = params.id;

  return <div>post id klinketo: {id}</div>;
};

export default page;
