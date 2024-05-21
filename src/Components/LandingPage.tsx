import { VscDebugStart } from "react-icons/vsc";
import { StoreType, gameStore } from "../store";
import { Button } from "./Button";

export function LandingPage() {
  const { difficulty, difficulties, changeDiff, setIsPlaying } =
    gameStore<StoreType>(function (state) {
      return state;
    });

  function handleStart(): void {
    setIsPlaying(true);
  }

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center space-y-6 text-white">
      <section className="space-y-2 text-center">
        <h1 className="text-5xl uppercase tracking-widest">TypeMaster</h1>

        <p
          className=" tracking-wider text-stone-500
        "
        >
          Do you want to know how effective you are at typing?
        </p>

        <p className="text-sm tracking-wider text-yellow-500">
          Please note that the test is case-sensitive!
        </p>
      </section>

      <section className="items-center space-y-2 text-center">
        <h1 className="text-base font-bold capitalize tracking-wider">
          select difficulty
        </h1>

        <div className="flex  gap-x-4">
          {difficulties.map((diff, i) => {
            return (
              <Button
                title={diff}
                onClickFn={() => changeDiff(i)}
                label={diff}
                isDiff={true}
                diff={difficulty}
              />
            );
          })}
        </div>
      </section>

      <Button
        title="Start"
        onClickFn={handleStart}
        label={<VscDebugStart className="text-2xl" />}
        rounded={true}
      />
    </main>
  );
}
