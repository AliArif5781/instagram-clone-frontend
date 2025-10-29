import { useEffect, useState } from "react";
import {
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  BadgeCheck,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { getAllFollowerPostThunk } from "../store/postSlice/post.thunk";
import Loader from "./Loader";

const PostFeed = () => {
  // Static data - no props needed
  const dispatch = useAppDispatch();
  const { getFollowerPost, loading } = useAppSelector((state) => state.post);
  console.log(getFollowerPost, "GFP");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1254);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const postData = {
    author: {
      username: "privee_.jutt",
      location: "USA, California",
      avatar: "https://ik.imagekit.io/sv6rjk3rj/profile_RfLX57D4l.jpg",
    },
    image:
      "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    caption: "Beautiful sunset at the beach! 🌅✨ #sunset #beach #vacation",
    likes: 1254,
    comments: [
      { id: 1, user: "john_doe", text: "Amazing shot! 🔥", time: "2h" },
      { id: 2, user: "sarah_m", text: "Wish I was there! 😍", time: "1h" },
      {
        id: 3,
        user: "travel_lover",
        text: "Which beach is this?",
        time: "45m",
      },
    ],
    timestamp: "5 hours ago",
  };

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleAddComment = (e: any) => {
    e.preventDefault();
    if (comment.trim()) {
      // In real app, you'd send to backend
      setComment("");
    }
  };

  useEffect(() => {
    dispatch(getAllFollowerPostThunk());
  }, [dispatch]);

  if (loading.getAllFollowerPostLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  const formatInstagramTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    // const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d`;
    } else {
      // Manual formatting for "8 Oct" format
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = date.getDate();
      const month = months[date.getMonth()];
      return `${day} ${month}`;
    }
  };
  return (
    <div className="max-w-lg mx-auto text-white  rounded-lg  shadow-lg mb-5">
      {/* Post Header */}
      {getFollowerPost.map((post) => (
        <div key={post._id}>
          <header className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 ">
              <img
                src={post.author.profileImage}
                alt={post.author.fullName}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="w-full">
                <div className="flex items-center text-[#F5F5F5] font-semibold text-sm">
                  {post.author.username}
                  {/* verified tag */}
                  <BadgeCheck className="w-4 h-4 text-blue-400 mx-1.5 mb-0.5" />
                  {/* Timestamp */}
                  <div className="ml-2 text-[#A8A8A8]  text-xs flex items-center">
                    <span className="font-extrabold mr-[2px]">·</span>
                    <span className="font-medium">
                      {formatInstagramTime(post.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="block text-xs text-gray-400">
                    {post.author.Country},{" "}
                  </span>
                  <span className="block text-xs text-gray-400">
                    {post.author.City}
                  </span>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Ellipsis size={20} />
            </button>
          </header>

          {/* Post Image */}
          <div className="w-full  border-2 border-[var(--color-active-gray)]">
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-[30rem] object-cover"
            />
          </div>

          {/* Post Actions */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-4">
                <button
                  onClick={handleLike}
                  className={`p-1 transition-all duration-200 ${
                    isLiked ? "text-red-500 scale-110" : "text-white"
                  }`}
                >
                  <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button className="p-1 hover:text-gray-400 transition-colors">
                  <MessageCircle size={24} />
                </button>
                <button className="p-1 hover:text-gray-400 transition-colors">
                  <Share size={24} />
                </button>
              </div>
              <button
                onClick={handleSave}
                className={`p-1 transition-all duration-200 ${
                  isSaved ? "text-yellow-400" : "text-white"
                }`}
              >
                <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Likes Count */}
            <div className="mb-2">
              <span className="font-semibold text-sm">
                {likesCount.toLocaleString()} likes
              </span>
            </div>

            {/* Caption */}
            <div className="flex items-center mb-2">
              <span className="font-semibold text-sm mr-2">{post.caption}</span>
              <span className="text-xs text-[var(--color-lightt-gray)] py-1">
                {post.caption}
              </span>
            </div>

            {/* View Comments */}
            {postData.comments.length > 0 && (
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-gray-400 text-sm mb-2 hover:text-gray-300"
              >
                {showComments ? "Hide" : "View"} all {postData.comments.length}{" "}
                comments
              </button>
            )}

            {/* Comments Section */}
            {showComments && (
              <div className="space-y-3 mb-3">
                {postData.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2">
                    <span className="font-semibold text-sm">
                      {comment.user}
                    </span>
                    <span className="text-sm flex-1">{comment.text}</span>
                    <span className="text-gray-400 text-xs">
                      {comment.time}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className={`text-sm font-semibold ${
                  comment.trim() ? "text-blue-400" : "text-blue-700"
                } disabled:cursor-not-allowed`}
              >
                Post
              </button>
            </form>
            <div className="pt-3 border-b border-gray-800 w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
