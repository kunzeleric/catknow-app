import { CatProps } from "@/@types/cat";
import Image from "next/image";
import { useRouter } from "next/router";

interface CardProps {
  cat: CatProps;
}

export function Card({ cat }: CardProps) {
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(`/details/${cat.id}`)}
      className="flex h-60 w-[209px] cursor-pointer flex-col rounded-xl border border-black"
    >
      <Image
        className="h-[209px] w-[209px] rounded-t-xl object-cover"
        src={cat.url}
        alt=""
        width={300}
        height={300}
      />
      <p className="flex h-[31px] items-center justify-center text-center font-bold text-black">
        {cat.breeds?.[0]?.name}
      </p>
    </div>
  );
}
