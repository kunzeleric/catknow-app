interface FilterPillProps {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function FilterPill({ title, isSelected, onSelect }: FilterPillProps) {
  return (
    <span
      onClick={onSelect}
      className={`${
        isSelected
          ? "border-white bg-selected-filter text-white"
          : "border-black bg-white text-black"
      } cursor-pointer text-nowrap rounded-full border px-4 py-1.5 duration-300 ease-in-out hover:border-white hover:bg-selected-filter hover:text-white`}
    >
      {title}
    </span>
  );
}
