import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { tryOnApi } from '../features/tryOn/api/tryOnApi';
import { tryOnReducer } from '../features/tryOn/model/tryOnSlice';

const rootReducer = combineReducers({
  [tryOnApi.reducerPath]: tryOnApi.reducer,
  tryOn: tryOnReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'attira-root',
    version: 1,
    storage: AsyncStorage,
    // Only persist our own slice — never the RTK Query cache.
    whitelist: ['tryOn'],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tryOnApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
