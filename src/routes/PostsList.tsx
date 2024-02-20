import {Link, useLoaderData} from "react-router-dom";

export interface Post {
  id: number;
  content: string;
  created: number;
}

export async function loader() {
  const posts: Post[] | undefined = await fetch(
    "http://localhost:7070/posts",
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });
  if (!posts) {
    throw new Error("Failed to fetch posts");
  }
  return posts;
}

export default function PostsList() {
  const posts = useLoaderData() as Post[];
  return (
    <div className="border-x-2 border-b-2 divide-y-2 divide-gray-200">
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`} className="post block">
          <div className="w-full p-4 hover:bg-gray-100" >
            <div className="text-xs">{new Date(post.created).toLocaleString("ru-RU")}</div>
            <p>{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}