import Image from "next/image";
import { prisma } from "../../lib/db";

export default async function Home() {
  const posts = await prisma.post.findMany();
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-4xl font-semibold">All Posts</h1>
      <ul className="mt-5">
        {posts.map((post) => (
          <li key={post.id} className="border-b py-4">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
