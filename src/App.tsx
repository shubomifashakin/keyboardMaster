import { LandingPage } from "./Components/LandingPage";
import { TextDisplay } from "./Components/TextDisplay";

import { StoreType, gameStore } from "./store";

export default function App() {
  const { isPlaying } = gameStore<StoreType>(function (state) {
    return state;
  });

  return (
    <div className="bg-black">
      {!isPlaying ? <LandingPage /> : <TextDisplay />}
    </div>
  );
}
