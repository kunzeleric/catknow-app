import { CatProps } from "@/@types/cat";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  cat: CatProps;
}

export function Card({ cat }: CardProps) {
  return (
    <Link
      href={`/details/${cat.id}`}
      target="_blank"
      className="flex h-60 w-[209px] cursor-pointer flex-col rounded-xl border border-black shadow-md"
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
    </Link>
  );
}
