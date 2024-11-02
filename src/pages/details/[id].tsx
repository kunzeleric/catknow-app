import { fetchCatDetails } from "@/api/fetch-cat-details";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

export default function DetailsPage() {
  const { query } = useRouter();

  const catId = Array.isArray(query.id) ? query.id[0] : (query.id as string);

  const { data: cat, isLoading } = useQuery({
    queryKey: [`catId(${catId})`],
    queryFn: async () => await fetchCatDetails(catId),
    enabled: !!catId,
  });

  if (isLoading || !cat)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading cat details...
      </div>
    );

  return (
    <div className="mt-12 flex flex-col items-center gap-8 px-4 md:flex-row md:justify-start md:px-0 xl:max-w-7xl">
      <div className="flex h-auto w-full max-w-[431px] flex-col rounded-xl border border-black">
        <Image
          className="h-auto w-full rounded-t-xl object-cover sm:h-[355px] sm:w-[431px]"
          src={cat.url}
          alt=""
          width={431}
          height={355}
        />
        <p className="flex items-center justify-center text-center font-bold text-black">
          {cat.breeds?.[0]?.name}
        </p>
      </div>

      <table className="h-full table-auto text-left">
        <tbody>
          <tr>
            <td className="py-3 pr-4 font-bold sm:py-0">Name:</td>
            <td>{cat?.breeds[0].name}</td>
          </tr>
          <tr>
            <td className="py-3 pr-4 font-bold sm:py-0">Description:</td>
            <td>{cat.breeds[0].description}</td>
          </tr>
          <tr>
            <td className="py-3 pr-4 font-bold sm:py-0">Life Span:</td>
            <td>{cat.breeds[0].life_span}</td>
          </tr>
          <tr>
            <td className="py-3 pr-4 font-bold sm:py-0">Origin:</td>
            <td>{cat.breeds[0].origin}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
