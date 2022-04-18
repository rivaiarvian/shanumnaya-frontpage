import Link from "next/link";
import axios from "config/axios";

function Home(props) {
  return (
    <div className="container mx-auto mt-4">
      <main>
        <h1>Saya halaman utama</h1>
        <Link href="/random">
          <a>Bring me to random fatch page</a>
        </Link>
      </main>
    </div>
  );
}

Home.getInitialProps = async () => {
  try {
    const data = await axios.get(`/courses`);

    return { data: data.data };
  } catch (error) {}
};

export default Home;
