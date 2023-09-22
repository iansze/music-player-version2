import { FC } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { RootState } from "../redux/store.tsx";
import { useSelector } from "react-redux";
import { AudioPlayer } from "./AudioPlayer.tsx";

interface PlayPauseProps {
  songId: string;
  src: string | undefined;
  handlePause: () => void;
  handlePlay: () => void;
  isPlaying: boolean;
}

const PlayPause: FC<PlayPauseProps> = ({ handlePause, handlePlay, isPlaying, songId, src }) => {
  const activeSongId = useSelector((state: RootState) => state.player.activeSongId);

  return (
    <>
      {isPlaying && songId === activeSongId ? (
        <FaPauseCircle
          onClick={handlePause}
          className="text-white text-4xl cursor-pointer"
          title="Pause"
        />
      ) : (
        <FaPlayCircle
          onClick={handlePlay}
          className="text-white text-4xl cursor-pointer"
          title="Play"
        />
      )}
      <AudioPlayer src={src} isPlaying={isPlaying} songId={songId} />
    </>
  );
};

export default PlayPause;
