import { isNull, last } from "lodash";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";

function useConversations() {
  const { data, error, size, setSize, mutate, isValidating, isLoading } =
    useSWRInfinite(
      (pageIndex, previousPageData) => {
        if (pageIndex === 0) {
          return `api/proompter/chat/conversations`;
        }
        if (previousPageData.length < 1) {
          return null;
        }
        const cursor = previousPageData[previousPageData.length - 1].id;
        return `api/proompter/chat/conversations?cursor=${cursor}`;
      },
      async (url) => {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
          throw new Error("An error occurred while fetching the data.");
        }

        const data = await response.json();
        return data;
      },
      {
        revalidateAll: false,
        revalidateFirstPage: false,
        revalidateOnMount: true,
      }
    );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 1);
  return {
    mutate,
    conversations: data ? [].concat(...data) : [],
    isLoadingMore,
    isLoadingInitialData,
    isLoading,
    isValidating,
    size,
    setSize,
    isReachingEnd,
    error,
  };
}
export default useConversations;
