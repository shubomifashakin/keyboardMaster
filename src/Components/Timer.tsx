import { useEffect } from "react";

import { TimeStoreType, timeStore } from "../store";

import { defaultTime } from "../Settings/Helpers";
import { SlHourglass } from "react-icons/sl";

export function Timer({ hasFinished }: { hasFinished: boolean }) {
  const { timeUsed, incTime } = timeStore<TimeStoreType>(function (state) {
    return state;
  });

  //increase the time every second if the time hasnt reached 40 seconds or the user hasnt finished typing
  useEffect(
    function () {
      const interval = setInterval(function () {
        if (!hasFinished) {
          incTime();
        }
      }, 1000);

      return () => clearInterval(interval);
    },
    [incTime, hasFinished],
  );

  return (
    <p title="Time left" className="flex items-center gap-x-1">
      <SlHourglass className="text-lg" />
      :&nbsp;
      {`${defaultTime - timeUsed}`.padStart(2, "0")}s
    </p>
  );
}
