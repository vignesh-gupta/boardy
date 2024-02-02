import { Loader } from "lucide-react";
import React from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

const Loading = () => {
  return (
    <div className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-muted-foreground" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </div>
  );
};

export default Loading;
