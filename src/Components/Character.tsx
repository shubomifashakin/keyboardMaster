import { defaultTime } from "../Settings/Helpers";
import { TimeStoreType, timeStore } from "../store";

type CharDetails = {
  sentenceChars: string[];
  clicked: number;
  points: number[];
};

export function Chars({ sentenceChars, clicked, points }: CharDetails) {
  const { timeUsed } = timeStore<TimeStoreType>(function (state) {
    return state;
  });

  const timeElapsed = timeUsed === defaultTime;

  return (
    <div className="flex flex-wrap justify-center gap-y-4  whitespace-pre-wrap rounded-lg py-4 text-center">
      {sentenceChars.map((char, i) => {
        return (
          <span
            className={`border ${/[\s]/.test(char) ? "border-black px-3.5" : "px-2"} inline-block cursor-default py-1.5 text-center text-3xl font-bold ${clicked === i && !timeElapsed ? "animate-flasInfinite !border-white bg-white text-black" : ""}  ${clicked > i && points[i] ? "!border-white bg-green-800" : ""} ${clicked > i && !points[i] ? "!border-white bg-red-800" : ""} ${timeElapsed && !points[i] ? "!border-white bg-red-800" : ""}`}
            key={i}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
