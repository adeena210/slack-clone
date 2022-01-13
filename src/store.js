import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './reducers/user';
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'user',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer);

export default () => {
    let store = configureStore({
        reducer: persistedReducer,
        middleware: [thunk, logger]
    })
    let persistor = persistStore(store)
    return { store, persistor}
}

