import PostFeed from "./components/PostFeed";
import Widgets from "./components/Widgets";

export default function Home() {
  return (
    <div className="text-[#F1419] min-h-screen border-2 border-black max-w-[1400px] mx-auto flex flex-col md:flex-row">
      <PostFeed />
      <Widgets />
    </div>
  );
}
