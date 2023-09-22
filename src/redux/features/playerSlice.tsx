import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: { title: "" },
  activeSongId: null,
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSongId = action.payload.songId;
      if (action.payload?.track?.hub?.actions[1]?.uri) {
        state.currentSongs = action.payload?.track?.hub?.actions[1]?.uri;
      }
      if (action.payload?.track?.attributes?.previews[0]?.url) {
        state.currentSongs = action.payload?.track?.attributes?.previews[0]?.url;
      } else {
        state.currentSongs = action.payload.song;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      //(state.currentSongs[action.payload]?.track)
      if (state.currentSongs[action.payload]) {
        state.activeSong = state.currentSongs[action.payload];
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      // (state.currentSongs[action.payload]?.track)
      if (state.currentSongs[action.payload]) {
        state.activeSong = state.currentSongs[action.payload];
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } =
  playerSlice.actions;

export default playerSlice.reducer;
