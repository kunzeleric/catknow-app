import { CatProps } from "@/@types/cat";
import Image from "next/image";

interface CardProps {
  cat: CatProps;
}

export function Card({ cat }: CardProps) {
  return (
    <div className="flex flex-col w-[209px] rounded-md h-60 border border-white">
      <Image
        className="object-cover w-[209px] h-[209px]"
        src={cat.url}
        alt=""
        width={300}
        height={300}
      />
      <p className="flex items-center justify-center h-[31px] text-center">
        {cat.breeds[0].name}
      </p>
    </div>
  );
}
