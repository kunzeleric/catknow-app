import { fetchBreeds } from "@/api/fetch-breeds";
import { fetchCats } from "@/api/fetch-cats";
import { Card } from "@/components/Card";
import { FilterPill } from "@/components/FilterPill";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const {
    data,
    isLoading: isLoadingCats,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cats", selectedFilter],
    queryFn: ({ pageParam }) =>
      fetchCats(selectedFilter ?? undefined, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length : undefined,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const { data: breeds, isLoading: isLoadingBreeds } = useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const screenHeight = window.innerHeight;
      const currentScrollPosition = window.scrollY;
      const totalScrollHeight = document.documentElement.scrollHeight;
      const isTotalScrollHeightReached =
        screenHeight + currentScrollPosition >= totalScrollHeight;
      
      if (isTotalScrollHeightReached && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoadingCats || isLoadingBreeds)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading data...
      </div>
    );

  return (
    <section className="mb-4 flex max-w-sm flex-col justify-center md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
      <div className="mb-2 flex justify-start gap-2 overflow-x-auto py-2 pl-2">
        {breeds &&
          breeds
            .sort((a, b) => {
              if (a.id === selectedFilter) return -1;
              if (b.id === selectedFilter) return 1;
              return a.name.localeCompare(b.name);
            })
            .map((breed) => (
              <FilterPill
                key={breed.id}
                title={breed.name}
                isSelected={selectedFilter === breed.id}
                onSelect={() =>
                  setSelectedFilter(
                    selectedFilter === breed.id ? null : breed.id,
                  )
                }
              />
            ))}
      </div>
      <div className="grid grid-cols-[209px] justify-center gap-x-10 gap-y-4 md:grid-cols-[repeat(2,minmax(0,209px))] lg:grid-cols-[repeat(4,minmax(0,209px))]">
        {data && data.pages.map((page) => {
          return page.map((cat) => {
            if (cat.breeds.length > 0) return <Card key={cat.id} cat={cat} />;
          });
        })}
      </div>
      {isFetchingNextPage && (
        <div className="w-full py-2 text-center text-lg font-semibold">
          Loading more cats...
        </div>
      )}
    </section>
  );
}
