import Image from "next/image";

const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty-favorites.svg"
        height={140}
        width={140}
        alt="Empty favorites"
      />
      <h2 className="text-2xl mt-6 font-semibold ">
        No favorite board!
      </h2>
      <p className="text-sm mt-2 text-muted-foreground ">
        Try adding some boards to your favorites
      </p>
    </div>
  );
};

export default EmptyFavorites;
