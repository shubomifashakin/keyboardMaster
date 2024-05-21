import { ReactNode } from "react";

export function Button({
  onClickFn,
  label,
  isDiff,
  diff,
  rounded = false,
  title,
}: {
  label: string | ReactNode;
  diff?: string;
  isDiff?: boolean;
  onClickFn(): void;
  rounded?: boolean;
  title?: string;
}) {
  return (
    <button
      title={title}
      type="button"
      className={`${rounded ? "rounded-full" : "rounded-lg"}  border-2 tracking-wider ${!isDiff ? "text-stone-300" : ""} ${isDiff && diff !== label ? "bg-yellow-500" : ""} ${isDiff && diff === label ? "bg-white text-black" : ""} border-stone-300 p-3 font-bold  transition-colors duration-300 ease-in-out hover:bg-stone-300 hover:text-black`}
      onClick={onClickFn}
    >
      {label}
    </button>
  );
}
