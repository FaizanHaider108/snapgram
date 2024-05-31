import { Loader } from "lucide-react";
import GridPostsList from "./GridPostsList";
import { Models } from "appwrite";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchPosts: Models.Document[];
};

export const SearchResults = ({ isSearchFetching, searchPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchPosts.length > 0) {
    return <GridPostsList posts={searchPosts} showStats={false} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};
