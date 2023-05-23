import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appStateReducer} from "./slices/AppStateSlice";
import {userDataReducer} from "./slices/UserDataSlice";
import {storeStateReducer} from "./slices/StoreStateSlice";
import {planetStateReducer} from "./slices/PlanetStateSlice";
import {messageStateReducer} from "./slices/MessagesStateSlice";
import {storePlanetSceneReducer, storePlanetSceneSlice,} from "./slices/sceneSlices/StorePlanetSceneSlice";


const rootReducer = combineReducers({
    appStateReducer,
    userDataReducer,
    storeStateReducer,
    planetStateReducer,
    messageStateReducer,
    storePlanetSceneReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']