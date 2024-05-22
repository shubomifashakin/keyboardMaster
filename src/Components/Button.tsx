import { ReactNode } from "react";

export function Button({
  onClickFn,
  label,
  isSelected,
  rounded = false,
  title,
}: {
  label: string | ReactNode;
  isSelected?: boolean;
  onClickFn(): void;
  rounded?: boolean;
  title?: string;
}) {
  return (
    <button
      title={title}
      disabled={isSelected}
      type="button"
      className={`${rounded ? "rounded-full" : "rounded-lg"}  $ border-2 tracking-wider ${isSelected ? "bg-white text-black" : ""} border-stone-300 p-3 font-bold  transition-colors duration-300 ease-in-out hover:bg-stone-300 hover:text-black`}
      onClick={onClickFn}
    >
      {label}
    </button>
  );
}
