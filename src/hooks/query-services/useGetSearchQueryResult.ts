"use client";

import { Prisma, Subreddit } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetSearchQueryResult(input: string) {
  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  return {
    isFetching,
    queryResults,
    refetch,
    isFetched,
  };
}
