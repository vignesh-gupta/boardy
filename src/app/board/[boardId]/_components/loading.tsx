import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

const Loading = () => {
  return (
    <div className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-muted-foreground" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </div>
  );
};

export default Loading;
