import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";

type CardFooterProps = {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
};

const CardFooter = ({
  authorLabel,
  createdAtLabel,
  disabled,
  isFavorite,
  onClick,
  title
}: CardFooterProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  return (
    <div className="relative bg-white p-3 ">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] truncate text-muted-foreground">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 text-muted-foreground hover:text-blue-500",
          disabled && "cursor-not-allowed"
        )}
      >
        <Star
          className={cn("w-4 h-4", isFavorite && "fill-blue-600 text-blue-600")}
        />
      </button>
    </div>
  );
};

export default CardFooter;
