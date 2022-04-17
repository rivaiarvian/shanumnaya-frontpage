import Link from "next/link";

function Todo({ data }) {
  return (
    <main className="container mt-4 mx-auto">
      <h1 className="text-3xl">{data.title}</h1>
      <p>Please complete your task</p>
      <Link href="/random">
        <a>Back random</a>
      </Link>
    </main>
  );
}

Todo.getInitialProps = async (props) => {
  const { id } = props.query;
  try {
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => response.json())
      .then((json) => json);

    return { data };
  } catch (error) {}
};

export default Todo;
