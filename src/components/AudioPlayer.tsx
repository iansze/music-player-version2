import { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.tsx";

interface AudioPlayerProps {
  src: string | undefined;
  isPlaying: boolean;
  songId: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ src, isPlaying, songId }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const activeSongId = useSelector((state: RootState) => state.player.activeSongId);

  useEffect(() => {
    if (isPlaying && songId === activeSongId) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, songId, activeSongId]);

  return <audio ref={audioRef} src={src} />;
};
