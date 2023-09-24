import { FC } from "react";
import { Link } from "react-router-dom";
import { Track } from "./Types/Track";
import PlayPause from "./PlayPause";
import { Artist, Song } from "./Types/Artist";
import { useGetArtistSummaryQuery } from "../redux/services/spotify";

interface SongListProps {
  tracks?: Track[];
  relatedSongIds?: { [key: string]: Song };
  isPlaying: boolean;
  handlePauseClick: () => void;
  handlePlayClick: (track: Track | Song) => void;
  title: string;
  linkTo: string;
  artistId: string;
}

interface SongListCardProps {
  songId: string;
  index: number;
  isPlaying: boolean;
  image: string;
  title: string;
  subtitle: string;
  linkTo: string;
  artistId: string;
  src: string;
  handlePauseClick: () => void;
  handlePlayClick: () => void;
}

export const SongList: FC<SongListProps> = ({
  tracks,
  artistId,
  title,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
  linkTo,
}) => {
  const getImageUrl = (url: string, width: number, height: number) => {
    return url?.replace("{w}", width.toString()).replace("{h}", height.toString());
  };

  let songs;
  const { data: artistData, isFetching: isFetchingArtist } = useGetArtistSummaryQuery(artistId);

  //Used in SongDetails.tsx and RandomSong.tsx
  if (artistData?.resources && !isFetchingArtist) {
    songs = Object.values(artistData?.resources?.songs).slice(0, 5);
  } else {
    songs = tracks;
  }

  if (isFetchingArtist && !tracks) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl text-white text-left">{title}</h2>
        {tracks && (
          <Link to={linkTo}>
            <p className="text-sm text-gray-300 cursor-pointer">See More</p>
          </Link>
        )}
      </div>
      <div className="flex flex-col mt-4 gap-1">
        <div>
          {songs.map((song?, index) => {
            return (
              <SongListCard
                key={song.id || song.key}
                songId={song.id || song.key}
                image={
                  getImageUrl(song?.attributes?.artwork?.url, 300, 400) || song.images.coverart
                }
                index={index}
                title={song.attributes?.name || song.subtitle}
                subtitle={song.attributes?.artistName || song.title}
                isPlaying={isPlaying}
                linkTo={`/songs/${song.id || song.key}`}
                artistId={artistId}
                src={song.attributes?.previews[0]?.url || song.hub?.actions[1]?.uri}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() => handlePlayClick(song)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SongListCard: FC<SongListCardProps> = ({
  songId,
  index,
  isPlaying,
  image,
  title,
  subtitle,
  linkTo,
  artistId,
  src,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="text-white w-full flex flex-row items-center hover:bg-slate-500 py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
      <div className="flex-1 flex flex-row items-center">
        <img className="w-20 h-20 rounded-lg" src={image} alt={title} />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={linkTo}>
            <p className="text-xl font-bold text-white">{title}</p>
          </Link>
          <Link to={`/artists/${artistId}`}>
            <p className="text-base text-gray-300 mt-1">{subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        songId={songId}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        src={src}
      />
    </div>
  );
};
