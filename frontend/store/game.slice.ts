// src/store/ad/ad.slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMyGame {
  id: number;
  name: string;
  href: string;
  url: string | null;
}

interface gameState {
  playedGames: IMyGame[];
  activeGame: string | null;
}

const initialState: gameState = {
  playedGames: [],
  activeGame: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    saveGame(state, action: PayloadAction<IMyGame>) {
      const exists = state.playedGames.find(
        (game) => game.id === action.payload.id
      );

      if (!exists) {
        state.playedGames.push(action.payload);
      }
    },
    saveActiveGame(state, action: PayloadAction<{ url: string | null }>) {
      state.activeGame = action.payload.url;
    },

    deleteGame(state, action: PayloadAction<{ id: number }>) {
      state.playedGames = state.playedGames?.filter((el) => el.id !== action.payload.id)
    }
  },
});

export const { saveGame, saveActiveGame, deleteGame } = gameSlice.actions;

export default gameSlice.reducer;
