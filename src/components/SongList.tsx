import { FC } from "react";
import { Link } from "react-router-dom";
import { Track } from "./Types/Track";
import PlayPause from "./PlayPause";
import { Artist, Song } from "./Types/Artist";

interface SongListProps {
  tracks?: Track[];
  artist?: Artist;
  relatedSongIds?: { [key: string]: Song };
  isPlaying: boolean;
  handlePauseClick: () => void;
  handlePlayClick: (track: Track | Song) => void;
  title: string;
  linkTo: string;
}

interface SongListCardProps {
  item: Track | Song;
  index: number;
  isPlaying: boolean;
  handlePauseClick: () => void;
  handlePlayClick: () => void;
}

export const SongList: FC<SongListProps> = ({
  tracks,
  title,
  relatedSongIds,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
  linkTo,
}) => {
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
        {tracks &&
          tracks.map((track, index) => (
            <SongListCard
              key={track.key}
              item={track}
              index={index}
              isPlaying={isPlaying}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(track)}
            />
          ))}
        {relatedSongIds &&
          Object.values(relatedSongIds || {}).map((song, index) => (
            <SongListCard
              key={song.id}
              item={song}
              index={index}
              isPlaying={isPlaying}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song)}
            />
          ))}
      </div>
    </div>
  );
};

const SongListCard: FC<SongListCardProps> = ({
  item,
  index,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
}) => {
  const getImageUrl = (url: string, width: number, height: number) => {
    return url.replace("{w}", width.toString()).replace("{h}", height.toString());
  };
  const isSong = "attributes" in item;
  const imageUrl = isSong
    ? getImageUrl(item.attributes.artwork.url, 300, 400)
    : item.images.coverart;
  const title = isSong ? item.attributes.name : item.title;
  const subtitle = isSong ? item.attributes.artistName : item.subtitle;
  const link = isSong ? "" : `/songs/${item.key}`;
  const songId = isSong ? item.id : item.key;
  const src = isSong ? item.attributes.previews[0].url : item.hub.actions[1].uri;

  return (
    <div className="text-white w-full flex flex-row items-center hover:bg-slate-500 py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
      <div className="flex-1 flex flex-row items-center">
        <img className="w-20 h-20 rounded-lg" src={imageUrl} alt={title} />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={link}>
            <p className="text-xl font-bold text-white">{title}</p>
          </Link>
          <Link to={`/artists/${songId}`}>
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
