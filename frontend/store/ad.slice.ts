// src/store/ad/ad.slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Platform, PlatformType } from "@/shared/types/global.types";
import { IProfile } from "@/features/user/types/user.types";

interface IMyGame {
  id: number;
  name: string;
  href: string | null;
  url: string | null;
}

interface AdState {
  cooldown: number;
  cooldownGame: number;
  secondsLeft: number;
  secondsGameLeft: number;
  tickets: number;
  ads: number;
  fullscreen: boolean;
  platform: PlatformType;
  user: IProfile | null;
}

const initialState: AdState = {
  cooldown: 0,
  cooldownGame: 0,
  secondsLeft: 0,
  secondsGameLeft: 0,
  tickets: 0,
  ads: 0,
  fullscreen: true,
  platform: Platform.TDESKTOP,
  user: null
};

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    startCooldown(
      state,
      action: PayloadAction<{ timer: number; type: "game" | "init" }>
    ) {
      const time = Date.now();
      if (action.payload.type === "game") {
        state.cooldownGame = action.payload.timer;
        state.secondsGameLeft = Math.floor(
          (action.payload.timer - time) / 1000
        );
        return;
      }
      state.cooldown = action.payload.timer;
      state.secondsLeft = Math.floor((action.payload.timer - time) / 1000);
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

    gameAdaTimerTick(state) {
      const time = Date.now();
      if (state.cooldownGame > time) {
        state.secondsGameLeft = Math.floor((state.cooldownGame - time) / 1000);
        return;
      }

      state.cooldownGame = 0;
      state.secondsGameLeft = 0;
    },

    updateScreen(state, action: PayloadAction<boolean>) {
      state.fullscreen = action.payload;
    },

    savePlatform(state, action: PayloadAction<PlatformType>) {
      state.platform = action.payload;
    },

    saveUser(state, action: PayloadAction<IProfile>) {
      state.user = action.payload;
    },


    adsTicketsUpdate(
      state,
      action: PayloadAction<{ ads: number; tickets: number }>
    ) {
      state.tickets = action.payload.tickets;
      state.ads = action.payload.ads;
    },
  },
});

export const {
  startCooldown,
  saveUser,
  tick,
  adsTicketsUpdate,
  gameAdaTimerTick,
  updateScreen,
  savePlatform,
} = adSlice.actions;

export default adSlice.reducer;
