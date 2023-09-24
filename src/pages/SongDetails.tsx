import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../redux/store";
import {
  useGetArtistSummaryQuery,
  useGetRelatedArtistQuery,
  useGetShaZamSongDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongDetailsV2Query,
} from "../redux/services/spotify";
import { DetailsHeader, Loader } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { SongList } from "../components/SongList";
import { Song } from "../components/Types/Artist";
import { Track } from "../components/Types/Track";

interface SongDetailsProps {}

//716767500
const SongDetails: FC<SongDetailsProps> = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const { isPlaying } = useSelector((state: RootState) => state.player);

  const { data: relatedArtistData, isFetching: isFetchingRelatedArtist } =
    useGetRelatedArtistQuery(songId);

  const { data: shazamSongData, isFetching: isFetchingShazamSong } =
    useGetShaZamSongDetailsQuery(songId);

  const { data: songData, isFetching: isFetchingSong } = useGetSongDetailsQuery(songId);

  const { data: songDataV2, isFetching: isFetchingSongV2 } = useGetSongDetailsV2Query(songId);

  let artistId = "";
  let data = "";

  //Because the API is not consistent, we have to check for the data in different ways
  if (songDataV2 && !isFetchingSongV2 && !songDataV2.errors) {
    artistId = songDataV2?.data[0]?.relationships?.artists?.data[0]?.id;
    data = songDataV2;
  } else if (shazamSongData && !isFetchingShazamSong && !shazamSongData.errors) {
    artistId =
      shazamSongData?.resources?.["shazam-songs"]?.[songId]?.relationships?.artists?.data[0]?.id;
    data = shazamSongData;
  }
  //
  else if (songData && !isFetchingSong && Object.keys(songData).length > 0) {
    artistId = songData?.artists[0]?.adamid;
    data = songData;
  } else if (relatedArtistData && !isFetchingRelatedArtist && !relatedArtistData.errors) {
    artistId = relatedArtistData.data[0].id;
    data = relatedArtistData;
  }

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

  return (
    <div className="flex flex-col">
      <DetailsHeader song={data} songId={songId} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
      </div>
      <div className="">
        {songData?.resources?.lyrics?.text ? (
          songData?.resources?.lyrics?.text.map((lyrics: string, index: number) => (
            <p key={index} className="text-white text-lg">
              {lyrics}
            </p>
          ))
        ) : (
          <p className="mb-5 text-white text-lg">No lyrics found</p>
        )}
      </div>
      {artistId && (
        <SongList
          data={data}
          artistId={artistId}
          isPlaying={isPlaying}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          title={`More by ${artistName}`}
          linkTo={`/songs/${songData?.id}`}
        />
      )}
    </div>
  );
};

export default SongDetails;
