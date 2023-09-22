import { FC } from "react";
import { Song } from "./Types/Song";
import { Link } from "react-router-dom";

interface DetailsHeaderProps {
  song: Song;
}

const DetailsHeader: FC<DetailsHeaderProps> = ({ song }) => {
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          src={song?.images.coverarthq}
          alt="art"
          className="sm:w-48 rounded-full object-cover border-2 shadow-xl w-28"
        />

        <div className="ml-5">
          <p className="text-white text-2xl font-bold">{song?.title}</p>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className="text-white/80 text-1xl font-bold my-1">{song?.subtitle}</p>
          </Link>
          <p className="text-white/70 text-1xl font-bold">{song?.genres.primary}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
