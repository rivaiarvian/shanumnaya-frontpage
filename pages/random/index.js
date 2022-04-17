import Link from "next/link";

function Random({ data }) {
  return (
    <main className="container mt-4 mx-auto">
      <h1 className="text-3xl mb-5">fetching random</h1>
      <ul>
        {data.map((todo) => (
          <li key={`todo-${todo.id}`} className="border nborder-indigo-700 p-4">
            <Link href="/random/[id]" as={`/random/${todo.id}`}>
              <a>{todo?.title ?? "-"}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

Random.getInitialProps = async () => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => json);

    return { data };
  } catch (error) {}
};

export default Random;
