import { StoreType, gameStore } from "../store";

export function LandingPage() {
  const { difficulty, difficulties, changeDiff, setIsPlaying } =
    gameStore<StoreType>(function (state) {
      return state;
    });

  return (
    <div>
      <p>Difficulty:{difficulty}</p>

      {difficulties.map((diff, i) => {
        return (
          <p onClick={() => changeDiff(i)} key={i}>
            {diff}
          </p>
        );
      })}

      <button onClick={() => setIsPlaying()}>Start</button>
    </div>
  );
}
