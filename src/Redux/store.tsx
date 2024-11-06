import { combineReducers, createStore } from "redux";
import themeReducer from "./themeReducer";
import { persistReducer, persistStore } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage'
import { internetState } from "./internetReducer";

const persistConfig = {
    key: "root",
    storage
}

const rootReducer = combineReducers({
    themeState: persistReducer(persistConfig, themeReducer),
    internetState : internetState
})

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store)