// store.ts

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adReducer from "./ad.slice";
import { getPersistConfig } from 'redux-deep-persist'
import gameReducer from "./game.slice";

const rootReducer = combineReducers({
  ad: adReducer,
  game: gameReducer
});

const persistConfig = getPersistConfig({
  key: "root",
  storage,
  rootReducer,
  blacklist: ["ad.ads", "ad.tickets", "ad.user"]
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		})
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
