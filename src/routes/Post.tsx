import {Params, redirect, useFetcher, useLoaderData, useNavigate,} from "react-router-dom";
import {Post} from "@/routes/PostsList.tsx";

export async function loader({params}: { params: Params }) {
  const {post} = await fetch(`http://localhost:7070/posts/${params.id}`).then(
    (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    },
  );
  if (!post) {
    throw new Error("Failed to fetch post");
  }
  console.log(post);
  return post;
}

export async function action({
                               request,
                               params,
                             }: {
  request: Request;
  params: Params;
}) {
  const formData = await request.formData();
  if (formData.has("delete")) {
    await fetch(`http://localhost:7070/posts/${params.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return;
      } else {
        throw new Error(res.statusText);
      }
    });
  }
  if (formData.has("edit")) {
    return redirect(`/posts/${params.id}/edit`);
  }
  return redirect("/");
}

export default function Post() {
  const post = useLoaderData() as Post;
  const navigate = useNavigate();
  const fetcher = useFetcher();

  if (!post) {
    throw new Error("Failed to fetch post");
  }

  return (
    <div className="mt-12 w-9/12 mx-auto border-2 flex flex-wrap rounded-md">
      <div className="w-full flex justify-end bg-gray-200">
        <button className="px-2 text-white rounded-md hover:bg-blue-700" type="button"
                onClick={() => navigate("/")}>
          X
        </button>
      </div>
      <div className="w-full min-h-[80px]">
        <div className="text-xs p-2">{new Date(Number(post.created)).toLocaleString("ru-RU")}</div>
        <div className="w-full p-2">
          <p>{post.content}</p>
        </div>
      </div>
      <div className="w-full flex justify-end gap-2 bg-gray-200 pr-3 pt-1 pb-0.5">
        <button className="px-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 align-text-bottom"
                type="button"
                onClick={() => navigate(`/posts/${post.id}/edit`)}
        >
          Редактировать
        </button>
        <fetcher.Form method="post" id="delete-post"
                      className="px-2 text-white bg-red-500 rounded-md hover:bg-red-700 align-text-bottom">
          <button type="submit" name="delete">
            Удалить
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}