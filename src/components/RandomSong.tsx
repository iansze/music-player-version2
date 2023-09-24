import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetPlaylistQuery } from "../redux/services/spotify";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { Link } from "react-router-dom";
import { Track } from "./Types/Track";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

import { SongList } from "./SongList";
import { Song } from "./Types/Artist";

interface RandomSongProps {}

const getRandomSongs = (songs: Track[], count: number): Track[] => {
  const randomSongs: Track[] = [];
  const usedIndices: Set<number> = new Set();

  while (randomSongs.length < count) {
    const randomIndex = Math.floor(Math.random() * 10);
    if (!usedIndices.has(randomIndex)) {
      randomSongs.push(songs[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  return randomSongs;
};

const RandomSong: FC<RandomSongProps> = () => {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state: RootState) => state.player);
  const { data, isFetching, error } = useGetPlaylistQuery("484129036");
  const [randomSongs, setRandomSongs] = useState<Track[]>([]);
  const [RandomArtists, setRandomArtists] = useState<Track[]>([]);

  useEffect(() => {
    if (data?.tracks) {
      setRandomSongs(getRandomSongs(data.tracks, 5));
      setRandomArtists(getRandomSongs(data.tracks, 10));
    }
  }, [data]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (item: Track | Song) => {
    let songUri: string | undefined;
    let songKey: string = "";

    if ("hub" in item) {
      songUri = item.hub.actions[1].uri;
      songKey = item.key;
    }
    if ("attributes" in item) {
      songUri = item.attributes.previews[0].url;
      songKey = item.id;
    }
    dispatch(setActiveSong({ song: songUri, track: item, i: songKey, songId: songKey }));
    dispatch(playPause(true));
  };

  return (
    <div>
      <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
        <SongList
          tracks={randomSongs}
          artistId=""
          isPlaying={isPlaying}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          title={"Random Song"}
          linkTo={"/random-songs"}
        />

        <div className="mt-4 flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-bold text-3xl text-white text-left">Random Artists</h2>
            <Link to="/random-artists">
              <p className="text-sm text-gray-300 cursor-pointer">See More</p>
            </Link>
          </div>

          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4 flex"
          >
            {RandomArtists.map((track: Track) => (
              <SwiperSlide
                key={track.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-sliderRight"
              >
                <Link to={`/artists/${track.artists[0].adamid}`}>
                  <img
                    src={track.images.coverart}
                    alt="song"
                    className="rounded-full w-full object-cover "
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default RandomSong;
