import EmptyBoard from "./empty-boards";
import EmptyFavorites from "./empty-favorites";
import EmptySearch from "./empty-search";

type EmptyStatesProps = {
  data: any[];
  query: {
    search?: string;
    favorites?: string;
  };
};

const EmptyStates = ({ data, query }: EmptyStatesProps) => {
  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  return <EmptyBoard />;
};

export default EmptyStates;
