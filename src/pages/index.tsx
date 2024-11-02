import { fetchCats } from "@/api/fetch-cats";
import { Card } from "@/components/Card";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: cats, isLoading } = useQuery({
    queryKey: ["cats"],
    queryFn: fetchCats,
  });

  if (isLoading && !cats) return <>Loading...</>;

  return (
    <main className="mx-6">
      <h1 className="text-2xl text-white font-bold text-center py-6">
        CATKNOW
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center gap-4">
        {cats &&
          cats.map((cat) => {
            return <Card cat={cat} />;
          })}
      </div>
    </main>
  );
}
