import { useEffect, useState } from "react";
import { LandingPage } from "./Components/LandingPage";
import { TextDisplay } from "./Components/TextDisplay";

import { StoreType, gameStore } from "./store";
import { Button } from "./Components/Button";
import { VscDebugStart } from "react-icons/vsc";

import { Toaster } from "react-hot-toast";

export default function App() {
  const { isPlaying } = gameStore<StoreType>(function (state) {
    return state;
  });

  //get the width of the device to see if they are capable of playing the game
  const [canPlay, setCanPay] = useState(function () {
    return window.innerWidth >= 1024;
  });

  //if the users screen isnt big enough but they have an external keyboard
  const [wantsToPlay, setWantsToPlay] = useState(true);

  function userWantsToPlay() {
    setCanPay(true);
    setWantsToPlay(true);
  }

  //checks if the user resized their screen to one thats compatible or not
  useEffect(function () {
    function eventFn() {
      const canPlay = window.innerWidth >= 1024;
      setCanPay(canPlay);
    }

    window.addEventListener("resize", eventFn);

    return () => window.removeEventListener("resize", eventFn);
  }, []);

  return (
    <div className="h-full w-full bg-black">
      <Toaster
        toastOptions={{
          success: {
            duration: 5 * 1000,
            style: {
              background: "#abf7b1",
            },
          },
          error: {
            duration: 1000 * 5,
            style: {
              background: "#ff6865",
            },
          },
        }}
      />

      <div className={`${canPlay && wantsToPlay ? "block" : "hidden"}`}>
        {!isPlaying ? <LandingPage /> : <TextDisplay />}
      </div>

      <div
        className={`flex h-dvh flex-col gap-y-4 px-2 text-center ${!canPlay || !wantsToPlay ? "block" : "hidden"}  w-full items-center justify-center text-white lg:hidden`}
      >
        <p>It's like you are on a mobile device.</p>

        <p className="text-xl font-bold text-yellow-300">
          This test is catered to devices with a dedicated keyboard!
        </p>

        <p>However, If you have an external keyboard, Go Ahead! </p>

        <Button
          title="Play"
          onClickFn={userWantsToPlay}
          label={<VscDebugStart className="text-2xl" />}
          rounded={true}
        />
      </div>
    </div>
  );
}
