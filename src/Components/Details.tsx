import { memo } from "react";
import { StoreType, gameStore } from "../store";
import { SlSettings } from "react-icons/sl";
import { Timer } from "./Timer";

export const Details = memo(function Details({
  hasFinished,
}: {
  hasFinished: boolean;
}) {
  const { difficulty } = gameStore<StoreType>(function (state) {
    return state;
  });

  return (
    <div className="flex cursor-default flex-col items-center gap-y-1 rounded-lg border-2 border-stone-300 p-3 tracking-wider text-stone-300  ">
      <span className="text-xs text-stone-500">Game Details</span>

      <div className="flex cursor-default  gap-x-3 ">
        <p title="Difficulty" className="flex items-center gap-x-1">
          <SlSettings className="text-lg" />: {difficulty}
        </p>

        <Timer hasFinished={hasFinished} />
      </div>
    </div>
  );
});
