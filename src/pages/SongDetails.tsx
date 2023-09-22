import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../redux/store";
import { useGetArtistSummaryQuery, useGetSongDetailsQuery } from "../redux/services/spotify";
import { DetailsHeader, Loader } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { SongList } from "../components/SongList";
import { Song } from "../components/Types/Artist";
import { Track } from "../components/Types/Track";

interface SongDetailsProps {}

const SongDetails: FC<SongDetailsProps> = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { isPlaying } = useSelector((state: RootState) => state.player);

  const { data: songData, isFetching: isFetchingSong } = useGetSongDetailsQuery(songid);

  const artistId = songData?.artists[0]?.adamid;
  const { data: artistData, isFetching: isFetchingArtist } = useGetArtistSummaryQuery(artistId);

  if (isFetchingSong || isFetchingArtist) return <Loader title="Loading..." />;

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

  const artistName = artistData?.resources?.artists?.[artistId]?.attributes?.name;
  const relatedSongIds = artistData?.resources?.songs;

  return (
    <div className="flex flex-col">
      <DetailsHeader song={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
      </div>
      <div className="">
        {songData?.sections[1]?.text ? (
          songData?.sections[1]?.text?.map((lyrics: string, index: number) => (
            <p key={index} className="text-white text-lg">
              {lyrics}
            </p>
          ))
        ) : (
          <p className="mb-5 text-white text-lg">No lyrics found</p>
        )}
      </div>

      <SongList
        relatedSongIds={relatedSongIds}
        isPlaying={isPlaying}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        title={`More by ${artistName}`}
        linkTo={"/random-songs"}
      />
    </div>
  );
};

export default SongDetails;
