import PostsList from "@/routes/PostsList.tsx";
import {Link} from "react-router-dom";

export default function Home() {
  return (
    <div className="w-9/12 mx-auto">
      <div className="h-12 flex justify-end items-center pr-2 bg-gray-200">
        <Link to="posts/new" className="px-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <span className="align-text-bottom">New Post</span>
        </Link>
      </div>
      <div>
        <PostsList/>
      </div>
    </div>
  );
}