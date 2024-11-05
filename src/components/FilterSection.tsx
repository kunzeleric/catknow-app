import { useQuery } from "@tanstack/react-query";
import { fetchBreeds } from "@/api/fetch-breeds";
import ClipLoader from "react-spinners/ClipLoader";

interface FilterSectionProps {
  selectedFilter: string | null;
  onSelect: (filter: string | null) => void;
}

export function FilterSection({
  selectedFilter,
  onSelect,
}: FilterSectionProps) {
  const { data: breeds, isLoading } = useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center gap-1 py-2">
        <ClipLoader />
        Loading breeds..
      </div>
    );

  return (
    <div className="mb-2 flex justify-start gap-2 overflow-x-auto py-2 pl-2">
      {breeds &&
        breeds
          .sort((a, b) => {
            if (a.id === selectedFilter) return -1;
            if (b.id === selectedFilter) return 1;
            return a.name.localeCompare(b.name);
          })
          .map((breed) => (
            <span
              key={breed.id}
              onClick={() =>
                onSelect(selectedFilter === breed.id ? null : breed.id)
              }
              className={`${
                breed.id === selectedFilter
                  ? "border-white bg-selected-filter text-white"
                  : "border-black bg-white text-black"
              } cursor-pointer text-nowrap rounded-full border px-4 py-1.5 duration-300 ease-in-out hover:border-white hover:bg-selected-filter hover:text-white`}
            >
              {breed.name}
            </span>
          ))}
    </div>
  );
}
