// src/store/ad/ad.slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdState {
  cooldown: number;
  secondsLeft: number;
}

const initialState: AdState = {
  cooldown: 0,
  secondsLeft: 0
};

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    startCooldown(state, action: PayloadAction<number>) {
      const time = Date.now();
      state.cooldown = action.payload;
      state.secondsLeft = Math.floor((action.payload - time) / 1000);
    },
    tick(state) {
      const time = Date.now();
      if (state.cooldown > time) {
        state.secondsLeft = Math.floor((state.cooldown - time) / 1000);
        return;
      }
      state.cooldown = 0;
      state.secondsLeft = 0;
    },
  },
});

export const { startCooldown, tick } =
  adSlice.actions;

export default adSlice.reducer;
