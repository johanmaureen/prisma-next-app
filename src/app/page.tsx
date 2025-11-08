import Image from "next/image";
import { prisma } from "../../lib/db";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany();
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-4xl font-semibold">All Posts</h1>
      <ul className="mt-5">
        {posts.map((post) => (
          <li key={post.id} className="border-b py-4">
            <Link href={`/posts/${post.id}`} className="underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
