import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  //reducerPath: This determines the key under which this API slice's
  //state will be stored in the Redux store.
  //It's set to the string "spotifyApi".
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com/",
    prepareHeaders(headers) {
      headers.set("X-RapidAPI-Key", "1633a67ad5mshd36db088d445182p1bc43ajsn0dae3c119861");
      headers.set("X-RapidAPI-Host", "shazam.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getPlaylist: builder.query({
        query: (id) => `songs/list-recommendations/?key=${id}&locale=en-US`,
      }),
      getShaZamSongDetails: builder.query({
        query: (id) => `shazam-songs/get-details?id=${id}&locale=en-US`,
      }),
      getSongDetails: builder.query({
        query: (id) => `songs/get-details?key=${id}&locale=en-US`,
      }),
      getSongDetailsV2: builder.query({
        query: (id) => `songs/v2/get-details?id=${id}&locale=en-US`,
      }),
      getRelatedArtist: builder.query({
        query: (id) => `songs/get-related-artist?id=${id}&locale=en-US`,
      }),
      getArtistSummary: builder.query({
        query: (id) => `artists/get-summary?id=${id}&locale=en-US`,
      }),
    };
  },
});

export const {
  useGetPlaylistQuery,
  useGetSongDetailsQuery,
  useGetShaZamSongDetailsQuery,
  useGetRelatedArtistQuery,
  useGetSongDetailsV2Query,
  useGetArtistSummaryQuery,
} = spotifyApi;
