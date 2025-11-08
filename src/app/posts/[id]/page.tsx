import { prisma } from "@/../lib/db";

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PostPage(props: Props) {
  const { id } = await props.params;
  console.log("Received id:", id);

  if (!id) {
    return (
      <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
        <h1 className="text-2xl font-semibold text-red-600">Missing Post ID</h1>
        <p>No post ID was provided</p>
      </main>
    );
  }

  try {
    const postId = parseInt(id);
    console.log("Parsed postId:", postId);

    if (!Number.isInteger(postId) || postId < 1) {
      return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Invalid Post ID
          </h1>
          <p>Please provide a valid post ID number</p>
        </main>
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Post Not Found
          </h1>
          <p>The post you're looking for doesn't exist</p>
        </main>
      );
    }

    return (
      <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <p>{post.content}</p>
      </main>
    );
  } catch (err) {
    console.error("Error fetching post:", err);
    return (
      <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
        <h1 className="text-2xl font-semibold text-red-600">
          Error Loading Post
        </h1>
        <p>There was an error loading the post. Please try again later.</p>
      </main>
    );
  }
}
