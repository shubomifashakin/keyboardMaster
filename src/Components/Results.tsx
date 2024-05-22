import { useEffect, useState } from "react";
import { StoreType, TimeStoreType, gameStore, timeStore } from "../store";
import { defaultTime } from "../Settings/Helpers";
import toast from "react-hot-toast";
import { SlSpeedometer, SlTarget } from "react-icons/sl";

type ResultDetails = {
  points: number[];
  totalChars: number;
  hasFinished: boolean;
};

export function Results({ points, totalChars, hasFinished }: ResultDetails) {
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
      //if new accuracy is greater than highscore for accuracy, update accuracy highscore
      if (
        hasFinished &&
        accuracy > accuracyHighScore &&
        speed <= speedHighScore
      ) {
        const updatedScores = JSON.stringify({
          accuracy,
          speed: speedHighScore,
        });

        localStorage.setItem(difficulty, updatedScores);

        setHighScore(updatedScores);

        //alert user
        toast.success(`New Accuracy HighScore for ${difficulty}`);
      }

      //if the new speed is greater than the highscore for speed, update speed highscore
      if (
        hasFinished &&
        speed > speedHighScore &&
        accuracy <= accuracyHighScore
      ) {
        const updatedScores = JSON.stringify({
          accuracy: accuracyHighScore,
          speed,
        });

        //set the new
        localStorage.setItem(difficulty, updatedScores);

        setHighScore(updatedScores);

        //alert user
        toast.success(`New Speed HighScore for ${difficulty}`);
      }

      //if both accuracy and speed are better than highs, update both
      if (
        hasFinished &&
        accuracy > accuracyHighScore &&
        speed > speedHighScore
      ) {
        const updatedScores = JSON.stringify({
          accuracy,
          speed,
        });

        localStorage.setItem(difficulty, updatedScores);

        setHighScore(updatedScores);

        toast.success(`New HighScore for ${difficulty}`);
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
