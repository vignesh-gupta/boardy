import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

type ScreenSizeProps = {
  children: React.ReactNode;
  className?: ClassValue;
};

const ScreenSize = ({ children, className }: ScreenSizeProps) => {
  return (
    <section className={cn("h-screen w-full", className)}>
      <div className="flex flex-col items-center justify-center h-full px-4 space-y-4 md:px-6">
        {children}
      </div>
    </section>
  );
};

export default ScreenSize;
