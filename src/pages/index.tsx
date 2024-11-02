import { CatProps } from "@/@types/cat";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const { data: cats, isLoading } = useQuery<CatProps[]>({
    queryKey: ["cats"],
    queryFn: async () => {
      const response = await api.get("/images/search", {
        params: {
          limit: 20,
          mime_types: ["image/jpg", "image/png"],
          has_breeds: true,
        },
      });

      return response.data;
    },
  });

  if (isLoading && !cats) return <>Loading...</>;

  return (
    <main className="mx-6">
      <h1 className="text-2xl text-white font-bold text-center py-6">CATKNOW</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center gap-4">
        {cats &&
          cats.map((cat) => {
            return (
              <div className="flex flex-col w-[209px] rounded-md h-60 border border-white">
                <Image
                  className="object-cover w-[209px] h-[209px]"
                  src={cat.url}
                  alt=""
                  width={300}
                  height={300}
                />
                <p className="flex items-center justify-center h-[31px] text-center">{cat.breeds[0].name}</p>
              </div>
            );
          })}
      </div>
    </main>
  );
}
