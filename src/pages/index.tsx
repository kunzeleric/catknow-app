import { fetchCategories } from "@/api/fetch-categories";
import { fetchCats } from "@/api/fetch-cats";
import { Card } from "@/components/Card";
import { FilterPill } from "@/components/FilterPill";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const { data: cats, isLoading: isLoadingCats } = useQuery({
    queryKey: ["cats"],
    queryFn: fetchCats,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const [selectedFilter, setSelectedFilter] = useState("");

  if (isLoadingCats || isLoadingCategories) return <div className="flex h-screen justify-center items-center">Loading...</div>;

  return (
    <section className="mb-4 flex flex-col justify-center md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
      <div className="flex flex-wrap justify-start gap-2 py-4">
        {categories &&
          categories
            .slice(0, 8)
            .map((category) => (
              <FilterPill
                key={category.id}
                title={category.name}
                isSelected={selectedFilter === category.name}
                onSelect={() =>
                  setSelectedFilter(
                    selectedFilter === category.name ? "" : category.name,
                  )
                }
              />
            ))}
      </div>
      <div className="grid grid-cols-[209px] justify-center gap-x-10 gap-y-4 md:grid-cols-[repeat(2,minmax(0,209px))] lg:grid-cols-[repeat(4,minmax(0,209px))]">
        {cats &&
          cats.map((cat) => {
            if (cat.breeds.length > 0) return <Card key={cat.id} cat={cat} />;
          })}
      </div>
    </section>
  );
}
