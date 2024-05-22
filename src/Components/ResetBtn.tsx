import { memo } from "react";

import { StoreType, TimeStoreType, gameStore, timeStore } from "../store";

import { Button } from "./Button";

import { VscDebugRestart } from "react-icons/vsc";

export const ResetBtn = memo(function ResetBtn() {
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
