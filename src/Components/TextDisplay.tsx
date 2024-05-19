import { useEffect, useRef } from "react";
import { formSentence, splitIntoChars } from "../Settings/Actions";
import { StoreType, gameStore } from "../store";

export function TextDisplay() {
  const clickedRef = useRef<number>(0);

  const { difficulty, setIsPlaying } = gameStore<StoreType>(function (state) {
    return state;
  });

  const randomSentence = formSentence(difficulty);

  //split the sentence into characters
  const sentenceChars = splitIntoChars(randomSentence);

  const totalChars = sentenceChars.length;
  console.log(totalChars);

  useEffect(
    function () {
      function keyUpFn(e: KeyboardEvent): void {
        if (clickedRef.current < totalChars) {
          clickedRef.current++;
        }
      }

      document.addEventListener("keyup", keyUpFn);

      return () => document.removeEventListener("keyup", keyUpFn);
    },
    [totalChars],
  );

  return (
    <p className="sentence">
      {sentenceChars.map((char, i) => {
        return (
          <span className="char" key={i}>
            {char}
          </span>
        );
      })}
    </p>
  );
}
