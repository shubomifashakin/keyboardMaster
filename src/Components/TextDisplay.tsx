import { memo, useCallback, useEffect, useReducer, useState } from "react";

import { StoreType, TimeStoreType, gameStore, timeStore } from "../store";

import { formSentence, splitIntoChars } from "../Settings/Actions";

import { defaultTime } from "../Settings/Helpers";

import { SlSettings, SlSpeedometer, SlTarget } from "react-icons/sl";
import { VscDebugRestart } from "react-icons/vsc";

import { Button } from "./Button";
import { Timer } from "./Timer";
import toast from "react-hot-toast";

type StateDetails = {
  clicked: number;
  points: number[];
};

type CharDetails = {
  sentenceChars: string[];
  clicked: number;
  points: number[];
};

type ResultDetails = {
  points: number[];
  totalChars: number;
  hasFinished: boolean;
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

//receives the sentence characters
function Display({ sentenceChars }: { sentenceChars: string[] }) {
  const [{ clicked, points }, dispatch] = useReducer(reducer, {
    clicked: 0,
    points: [],
  });

  const { timeUsed } = timeStore<TimeStoreType>(function (state) {
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
      }

      document.addEventListener("keydown", keyDownFn);

      return () => document.removeEventListener("keydown", keyDownFn);
    },
    [totalChars, clicked, checkFn, sentenceChars],
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

function Sentence({ sentenceChars }: { sentenceChars: string[] }) {
  const sentence = sentenceChars.join("");

  return (
    <p className="w-fit cursor-default rounded-lg border-2 border-yellow-300 p-3 text-center text-sm tracking-wider text-yellow-300">
      {sentence}
    </p>
  );
}

function Chars({ sentenceChars, clicked, points }: CharDetails) {
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

const Details = memo(function Details({
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

function Results({ points, totalChars, hasFinished }: ResultDetails) {
  const { timeUsed } = timeStore<TimeStoreType>(function (state) {
    return state;
  });

  const { difficulty } = gameStore<StoreType>(function (state) {
    return state;
  });

  //isHovering over results
  const [isHovering, setIsHovering] = useState<boolean>(false);
  //get the highScore for the difficulty from localStorage
  const [highScore, setHighScore] = useState(function (): string {
    const score = localStorage.getItem(difficulty);

    //if there is a highscore return it, if not return an empty object
    return score || JSON.stringify({ accuracy: 0, speed: 0 });
  });

  const jsonHighScore = JSON.parse(highScore);

  ///if there is a highscore
  const accuracyHighScore = jsonHighScore.accuracy;
  const speedHighScore = jsonHighScore.speed;

  //all the points accumulated by the user
  const totalPoints = points.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  //the users typing accuracy && speed
  const accuracy = (totalPoints / totalChars) * 100;
  const speed = totalPoints / timeUsed;

  //minimum speed & accuracy required to pass
  const minAccuracy = 50;
  const minSpeed = totalChars / defaultTime;

  //what results are beign shown
  const speedShown = isHovering ? speedHighScore : speed;
  const accuracyShown = isHovering ? accuracyHighScore : accuracy;

  function hanldeMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  useEffect(
    function () {
      if (
        hasFinished &&
        accuracy > accuracyHighScore &&
        speed <= speedHighScore
      ) {
        const updatedScores = JSON.stringify({
          accuracy: accuracy.toFixed(2),
          speed: speedHighScore,
        });

        localStorage.setItem(difficulty, updatedScores);

        setHighScore(updatedScores);

        //alert user
        toast.success("New Accuracy HighScore");
      }

      if (
        hasFinished &&
        speed > speedHighScore &&
        accuracy <= accuracyHighScore
      ) {
        const updatedScores = JSON.stringify({
          accuracy: accuracyHighScore,
          speed: speed.toFixed(2),
        });

        //set the new speed
        localStorage.setItem(difficulty, updatedScores);

        setHighScore(updatedScores);

        //alert user
        toast.success("New Speed HighScore");
      }

      if (
        hasFinished &&
        accuracy > accuracyHighScore &&
        speed > speedHighScore
      ) {
        const updatedScores = JSON.stringify({
          accuracy: accuracy,
          speed: speed,
        });

        localStorage.setItem(difficulty, updatedScores);

        setHighScore(updatedScores);

        toast.success("New HighScore");
      }
    },
    [
      accuracy,
      accuracyHighScore,
      speed,
      speedHighScore,
      difficulty,
      hasFinished,
    ],
  );

  return (
    <div
      title={`High Score for ${difficulty}`}
      onMouseEnter={hanldeMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex cursor-default flex-col items-center  gap-y-1 rounded-lg border-2 border-stone-300 p-3  tracking-wider text-stone-300 "
    >
      {isHovering ? (
        <span className="text-xs text-stone-500">High Scores</span>
      ) : (
        <span className="text-xs text-stone-500">
          Hover to View High Scores
        </span>
      )}

      <div className="flex cursor-default  gap-x-3 ">
        <p
          title="Accuracy"
          className={`results ${isHovering ? "text-white" : ""} ${!isHovering && hasFinished && accuracy > 50 ? "text-green-500" : ""} ${!isHovering && hasFinished && accuracy < 50 ? "text-red-500" : ""}`}
        >
          <SlTarget className="text-xl" title="accuracy" />:{" "}
          {accuracyShown.toFixed(2)}%
          {hasFinished ? (
            <span className="items-center text-xs"> (min. {minAccuracy}%)</span>
          ) : null}
        </p>

        <p
          title="Speed"
          className={`results ${isHovering ? "text-white" : ""} ${!isHovering && hasFinished && speed > minSpeed ? "text-green-500" : ""} ${!isHovering && hasFinished && speed < minSpeed ? "text-red-500" : ""}`}
        >
          <SlSpeedometer className="text-xl" />: {speedShown.toFixed(2)}
          <span className="text-sm">chars/s</span>
          {hasFinished ? (
            <span className="items-center text-xs">
              {" "}
              (min. {minSpeed}chars/s)
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}

const ResetBtn = memo(function ResetBtn() {
  const { resetGame } = gameStore<StoreType>(function (state) {
    return state;
  });

  const { resetTime } = timeStore<TimeStoreType>(function (state) {
    return state;
  });

  function handleReset() {
    resetGame();
    resetTime();
  }

  return (
    <Button
      title="Reset"
      onClickFn={handleReset}
      label={<VscDebugRestart className="text-xl" />}
      rounded={true}
    />
  );
});
