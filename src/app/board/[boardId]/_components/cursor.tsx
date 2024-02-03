"use client";

import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@root/liveblocks.config";
import { MousePointer2 } from "lucide-react";
import React, { memo } from "react";

type CursorProps = {
  connectionId: number;
};

const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user?.presence.cursor);

  const name = info?.name || "Anonymous";

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  const color = connectionIdToColor(connectionId);

  return (
    <foreignObject
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2 size={15} style={{ fill: color, color }} />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";

export default Cursor;
