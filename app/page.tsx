import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center ">
      <Link href={"/home"} className="bg-green-400 p-3 rounded-md">
        Go to Dashboard
      </Link>
    </main>
  );
}
