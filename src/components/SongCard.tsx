import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { FC } from "react";
import { Track } from "./Types/Track";

interface SongCardProps {
  track: Track;
  isPlaying: boolean;
  activeSong: { title: string };
}

const SongCard: FC<SongCardProps> = ({ track, isPlaying, activeSong }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    const song = track.hub.actions[1].uri;
    dispatch(setActiveSong({ song, track, songId: track.key }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop:blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong.title === track.title ? "flex bg-black bg-opacity-70" : "hidden"
          }`}
        >
          <PlayPause
            songId={track.key}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            src={track.hub.actions[1].uri}
          />
        </div>
        <img src={track.images.background} alt="song" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${track.key}`}>{track.title}</Link>
        </p>
        <p className="text-sm truncate text-white mt-1">
          <Link
            to={track.artists[0].adamid ? `/artists/${track.artists[0].adamid}` : "/top-artists"}
          >
            {track.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
