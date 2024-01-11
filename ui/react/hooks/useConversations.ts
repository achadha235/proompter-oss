import useSWRInfinite from "swr/infinite";

function useConversations() {
  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      // reached the end
      if (previousPageData && !previousPageData.length) return null;

      // first page, we don't have `previousPageData`
      if (pageIndex === 0) return `api/proompter/chat/conversations`;

      // add the cursor to the API endpoint
      return `api/proompter/chat/conversations?cursor=${
        previousPageData[previousPageData.length - 1].id
      }`;
    },
    async (url) => {
      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) {
        throw new Error("An error occurred while fetching the data.");
      }
      const data = await response.json();
      console.log(data);
      return data;
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
    size,
    setSize,
    isReachingEnd,
    error,
  };
}

export default useConversations;
