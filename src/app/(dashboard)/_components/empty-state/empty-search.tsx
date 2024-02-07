import Image from "next/image";

const EmptySearch = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty-search.svg"
        height={200}
        width={200}
        alt="Empty board"
      />
      <h2 className="text-2xl mt-6 font-semibold ">No results found!</h2>
      <p className="text-sm mt-2 text-muted-foreground ">
        Try searching for something else
      </p>
    </div>
  );
};

export default EmptySearch;
