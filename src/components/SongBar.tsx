// import { FC } from "react";
// import { Artist } from "./Types/Artist";

// type SongBarProps =  {
//   artistData: Artist;
//         isPlaying: boolean;
//         activeSongId: string | null;
//         handlePauseClick=() => void;
//         handlePlayClick=() => void;

// }

// const SongBar: FC<SongBarProps> = ({}) => {
//   return (
//     <div className=" text-white w-full flex flex-row items-center hover:bg-slate-500 py-2 p-4 rounded-lg cursor-pointer mb-2">
//       <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
//       <div className="flex-1 flex flex-row  items-center">
//         <img className="w-20 h-20 rounded-lg" src={track.images.coverart} alt={track.title} />
//         <div className="flex-1 flex flex-col justify-center mx-3">
//           <Link to={`/songs/${track.key}`}>
//             <p className="text-xl font-bold text-white">{track.title}</p>
//           </Link>
//           <Link to={`/artists/${track.artists[0].adamid}`}>
//             <p className="text-base text-gray-300 mt-1">{track.subtitle}</p>
//           </Link>
//         </div>
//       </div>
//       <PlayPause
//         isPlaying={isPlaying}
//         songId={track.key}
//         handlePause={handlePauseClick}
//         handlePlay={handlePlayClick}
//       />
//     </div>
//   );
// };

// export default SongBar;

import { FC } from "react";

interface SongBarProps {}

const SongBar: FC<SongBarProps> = ({}) => {
  return <div>SongBar</div>;
};

export default SongBar;
