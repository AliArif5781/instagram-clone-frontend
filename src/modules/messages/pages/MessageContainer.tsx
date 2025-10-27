import React from "react";
import MessageSidebar from "./MessageSidebar";
import OtherUsers from "./OtherUsers";
import MessageChat from "./MessageChat";

const MessageContainer = () => {
  return (
    <div className="flex h-dvh w-full">
      {/* No need to account for sidebar margin - Home handles it */}
      <MessageSidebar />
      <MessageChat />
    </div>
  );
};

export default MessageContainer;
