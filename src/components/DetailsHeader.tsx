import { FC } from "react";
import { Song } from "./Types/Song";
import { Link } from "react-router-dom";

interface DetailsHeaderProps {
  song: any;
  songId: string | undefined;
}

const DetailsHeader: FC<DetailsHeaderProps> = ({ song, songId }) => {
  const getImageUrl = (url: string, width: number, height: number) => {
    if (!url) return "";
    return url.replace("{w}", width.toString()).replace("{h}", height.toString());
  };

  if (!songId || !song.data) return null;

  //Because the API is not consistent, we have to check for the data in different ways
  const img =
    song?.resources?.["shazam-songs"]?.[songId]?.attributes?.images?.coverArt ||
    getImageUrl(song?.data[0]?.attributes?.artwork?.url, 300, 400);
  const title =
    song?.resources?.["shazam-songs"]?.[songId]?.attributes?.title ||
    song?.data[0]?.attributes?.name;
  const name =
    song?.resources?.["shazam-songs"]?.[songId]?.attributes?.artist ||
    song?.data[0]?.attributes?.artistName;
  const genres =
    song?.resources?.["shazam-songs"]?.[songId]?.attributes?.genres?.primary ||
    song?.data[0]?.attributes?.genreNames[0];
  const artistId =
    song?.resources?.["shazam-songs"]?.[songId]?.relationships?.artists?.data?.[0]?.id ||
    song?.data[0]?.id;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          src={img}
          alt="art"
          className="sm:w-48 rounded-full object-cover border-2 shadow-xl w-28 h-full"
        />

        <div className="ml-5">
          <p className="text-white text-2xl font-bold">{title}</p>
          <Link to={`/artists/${artistId}`}>
            <p className="text-white/80 text-1xl font-bold my-1">{name}</p>
          </Link>
          <p className="text-white/70 text-1xl font-bold">{genres}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
