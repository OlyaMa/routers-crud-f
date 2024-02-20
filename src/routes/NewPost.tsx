import { Form, redirect, useNavigate } from "react-router-dom";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await fetch(`http://localhost:7070/posts/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return redirect("/");
}

export default function NewPost() {
  const navigate = useNavigate();

  return (
    <Form method="post" id="new-post" className="mt-12 w-9/12 mx-auto border-2 flex flex-wrap rounded-md">
        <div className="w-full flex justify-end bg-gray-200 pb-0.5">
            <button className="px-2 text-white rounded-md hover:bg-blue-700" type="button" onClick={() => navigate(-1)}>
                X
            </button>
        </div>
      <div className="w-full">
        <textarea
            className="w-full min-h-[80px] resize-none p-2"
          placeholder="Введите текст"
          aria-label="Пост"
          name="content"
          rows={3}
        ></textarea>
      </div>
        <div className="w-full flex justify-end bg-gray-200 pr-3 pt-1 pb-0.5">
            <button className="px-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 align-text-bottom" type="submit">Опубликовать</button>
        </div>
    </Form>
  );
}