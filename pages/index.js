import Link from "next/link";

export default function Home() {
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
