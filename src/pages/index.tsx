import { fetchCats } from "@/api/fetch-cats";
import { Card } from "@/components/Card";
import { FilterSection } from "@/components/FilterSection";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

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

  if (isLoadingCats)
    return (
      <div className="flex gap-2 h-screen items-center justify-center">
        <ClipLoader size={50} /> Loading data...
      </div>
    );

  return (
    <Suspense fallback={<ClipLoader size={80} />}>
      <section className="mb-4 flex max-w-sm flex-col justify-center md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <FilterSection
          onSelect={setSelectedFilter}
          selectedFilter={selectedFilter}
        />
        <div className="grid grid-cols-[209px] justify-center gap-x-10 gap-y-4 md:grid-cols-[repeat(2,minmax(0,209px))] lg:grid-cols-[repeat(4,minmax(0,209px))]">
          {data &&
            data.pages.map((page) => {
              return page.map((cat) => {
                if (cat.breeds.length > 0)
                  return <Card key={cat.id} cat={cat} />;
              });
            })}
        </div>
        {isFetchingNextPage && (
          <div className="flex items-center justify-center gap-2 py-4 text-lg font-semibold">
            <ClipLoader size={40} /> Loading more cats...
          </div>
        )}
      </section>
    </Suspense>
  );
}
