import { Button } from "@/components/ui/button";
import Image from "next/image";

const EmptyBoard = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/note.svg"
        height={140}
        width={140}
        alt="Empty board"
      />
      <h2 className="text-2xl mt-6 font-semibold ">Create your first board</h2>
      <p className="text-sm mt-2 text-muted-foreground ">
        Start by creating a board for your team
      </p>
      <div className="mt-6">
        <Button size="lg">Create Board</Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
