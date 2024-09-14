import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center ">
      <Link href={"/protected"} className="bg-green-400 p-3 rounded-md">
        Go to the Protected route
      </Link>
    </main>
  );
}
