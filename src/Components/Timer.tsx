import { useEffect, useState } from "react";
import { StoreType, gameStore } from "../store";

export function Timer() {
  const [timer, setTimer] = useState<number>(0);

  const { setIsPlaying } = gameStore<StoreType>(function (state) {
    return state;
  });

  useEffect(
    function () {
      let interval: number;

      if (timer <= 40) {
        interval = setInterval(function () {
          setTimer((c) => c + 1);
        }, 1000);
      }

      //if timer is greater than 20 seconds, end the game
      if (timer > 40) {
        setIsPlaying(false);
      }

      return () => clearInterval(interval);
    },
    [timer, setIsPlaying],
  );

  return <p className="text-white">Time Left: {40 - timer}s</p>;
}
