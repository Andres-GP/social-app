import LoadingScreen from "./components/LoadingScreen";
import CommentModal from "./components/modals/CommentModal";
import PostFeed from "./components/PostFeed";
import Sidebar from "./components/Sidebar";
import SignUpPrompt from "./components/SignUpPrompt";
import Widgets from "./components/Widgets";

export default function Home() {
  return (
    <>
      <div className="text-[#F1419] min-h-screen max-w-[1400px] mx-auto flex flex-col sm:flex-col md:flex-row">
        <Sidebar />
        <PostFeed />
        <Widgets isDetail={true} />
      </div>

      <CommentModal />
      <SignUpPrompt />
      <LoadingScreen />
    </>
  );
}
