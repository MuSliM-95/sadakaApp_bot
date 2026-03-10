// src/store/ad/ad.slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMyGame {
  id: number;
  name: string;
  href: string;
  url: string | null;
}

interface gameState {
  playedGames: IMyGame[] | null;
  activeGame: string | null;
}

const initialState: gameState = {
  playedGames: null,
  activeGame: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    saveGame(state, action: PayloadAction<IMyGame>) {
      if (!state.playedGames) {
        state.playedGames = [];
      }

      const exists = state.playedGames.some(
        (game) => game.id === action.payload.id
      );

      if (!exists) {
        state.playedGames?.push(action.payload);
      }
    },
    saveActiveGame(state, action: PayloadAction<{ url: string | null }>) {
		state.activeGame = action.payload.url
	},
  },
});

export const { saveGame, saveActiveGame } = gameSlice.actions;

export default gameSlice.reducer;
