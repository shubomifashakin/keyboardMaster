import { useCallback, useEffect, useReducer } from "react";

import { StoreType, TimeStoreType, gameStore, timeStore } from "../store";

import { formSentence, splitIntoChars } from "../Settings/Actions";

import { defaultTime } from "../Settings/Helpers";

import { Results } from "./Results";
import { ResetBtn } from "./ResetBtn";
import { Details } from "./Details";
import { Chars } from "./Character";
import { Sentence } from "./Sentence";

type StateDetails = {
  clicked: number;
  points: number[];
};

function reducer(
  state: StateDetails,
  { label }: { label: string },
): StateDetails {
  switch (label) {
    case "passed":
      return {
        ...state,
        clicked: state.clicked + 1,
        points: [...state.points, 1],
      };

    case "failed":
      return {
        ...state,
        clicked: state.clicked + 1,
        points: [...state.points, 0],
      };

    default:
      return state;
  }
}

export function TextDisplay() {
  const { difficulty } = gameStore<StoreType>(function (state) {
    return state;
  });

  //form the sentence
  const randomSentence = formSentence(difficulty);

  //split the sentence into characters
  const sentenceChars = splitIntoChars(randomSentence);

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-y-6 px-12 text-white ">
      <Display sentenceChars={sentenceChars} />
    </div>
  );
}

const initialState = {
  clicked: 0,
  points: [],
};

//receives the sentence characters
function Display({ sentenceChars }: { sentenceChars: string[] }) {
  const [{ clicked, points }, dispatch] = useReducer(reducer, initialState);

  const { timeUsed, resetTime } = timeStore<TimeStoreType>(function (state) {
    return state;
  });

  const { resetGame } = gameStore<StoreType>(function (state) {
    return state;
  });

  //if the user has finished typing or the timer finished
  const timeElapsed = timeUsed === defaultTime;
  const finishedTyping = clicked === sentenceChars.length;
  const hasFinished = timeElapsed || finishedTyping;

  //confirms if the key clicked was a valid key during an active game
  const checkFn = useCallback(
    function checkKey(e: KeyboardEvent) {
      //tests if it is a letter, punctuation or whitespace
      return /^[\s\p{P}A-Za-z]$/u.test(e.key) && !hasFinished;
    },
    [hasFinished],
  );

  const totalChars = sentenceChars.length;

  //if a valid clickable key was clicked, check if the key was the correct one
  useEffect(
    function () {
      function keyDownFn(e: KeyboardEvent): void {
        if (checkFn(e) && e.key === sentenceChars[clicked]) {
          dispatch({ label: "passed" });
        }

        if (checkFn(e) && e.key !== sentenceChars[clicked]) {
          dispatch({ label: "failed" });
        }

        //if escape is clicked, reset the game
        if (e.key.toLowerCase() === "escape") {
          resetGame();
          resetTime();
        }
      }

      document.addEventListener("keydown", keyDownFn);

      return () => document.removeEventListener("keydown", keyDownFn);
    },
    [totalChars, clicked, checkFn, sentenceChars, resetTime, resetGame],
  );

  return (
    <>
      <Sentence sentenceChars={sentenceChars} />

      <Chars sentenceChars={sentenceChars} clicked={clicked} points={points} />

      <div className="flex items-center gap-x-4">
        <Details hasFinished={hasFinished} />

        <Results
          points={points}
          totalChars={totalChars}
          hasFinished={hasFinished}
        />

        <ResetBtn />
      </div>
    </>
  );
}
