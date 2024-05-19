import { LandingPage } from "./Components/LandingPage";
import { TextDisplay } from "./Components/TextDisplay";
import { StoreType, gameStore } from "./store";

export default function App() {
  const { isPlaying, setIsPlaying } = gameStore<StoreType>(function (state) {
    return state;
  });

  return (
    <div className="text-red-500">
      {!isPlaying ? <LandingPage /> : <TextDisplay />}
    </div>
  );
}
