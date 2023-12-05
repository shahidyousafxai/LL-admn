// Import for creating Store
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers Import
import authReducer from './reducers/authReducer';
import statesReducer from './reducers/statesReducer';
import previewReducer from './reducers/previewReducer';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    authUser: persistReducer(persistConfig, authReducer),
    states: persistReducer(persistConfig, statesReducer),
    previewData: persistReducer(persistConfig, previewReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
