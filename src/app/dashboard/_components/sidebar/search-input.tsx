"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import React, { useEffect } from "react";
import { useDebounce } from "usehooks-ts";

import { Input } from "@/components/ui/input";
import { DASHBOARD_ROUTE } from "@/lib/constants";

const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: DASHBOARD_ROUTE,
        query: {
          search: debouncedSearch
        }
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedSearch, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[560px] pl-9"
        placeholder="Search boards"
        onChange={handleChange}
        value={search}
      />
    </div>
  );
};

export default SearchInput;
