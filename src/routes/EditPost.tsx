import {Form, Params, redirect, useLoaderData, useNavigate,} from "react-router-dom";
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
  const data = Object.fromEntries(formData);
  await fetch(`http://localhost:7070/posts/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return redirect("/");
}

export default function NewPost() {
  const navigate = useNavigate();
  const post = useLoaderData() as Post;

  return (
    <Form method="post" id="new-post" className="mt-12 w-9/12 mx-auto border-2 flex flex-wrap rounded-md">
      <div className="w-full flex justify-end bg-gray-200 pb-0.5">
        <button className="px-2 text-white rounded-md hover:bg-blue-700" type="button"
                onClick={() => navigate(-1)}>
          X
        </button>
      </div>
      <div className="w-full">
                <textarea
                  className="w-full min-h-[80px] resize-none p-2"
                  placeholder="Введите текст"
                  aria-label="Пост"
                  name="content"
                >
                  {post.content}
                </textarea>
      </div>
      <div className="w-full flex justify-end gap-2 bg-gray-200 pr-3 pt-1 pb-0.5">
        <button className="px-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 align-text-bottom"
                type="submit">Сохранить
        </button>
        <button className="px-2 text-white bg-red-500 rounded-md hover:bg-red-700 align-text-bottom" type="button"
                onClick={() => navigate(-1)}>
          Отменить
        </button>
      </div>
    </Form>
  );
}