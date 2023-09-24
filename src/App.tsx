import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Searchbar, Sidebar, MusicPlayer, RandomSong } from "./components/index";
import {
  ArtistDetails,
  RandomArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  RandomSongs,
} from "./pages/index";
import { RootState } from "./redux/store";

const App = () => {
  const { activeSong } = useSelector((state: RootState) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll no-scrollbar flex xl:flex-row flex-col">
          <div className="xl:sticky relative top-0 h-fit"></div>
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/random-artists" element={<RandomArtists />} />
              <Route path="/random-songs" element={<RandomSongs />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songId" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <RandomSong />
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
