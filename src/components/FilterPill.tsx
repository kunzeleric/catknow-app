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
      } cursor-pointer rounded-full border px-4 py-1.5 hover:bg-selected-filter hover:text-white hover:border-white duration-300 ease-in-out`}
    >
      {title[0].toUpperCase() + title.slice(1)}
    </span>
  );
}
