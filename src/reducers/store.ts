import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appStateReducer} from "./slices/app/AppStateSlice";
import {userDataReducer} from "./slices/UserDataSlice";
import {planetStateReducer} from "./slices/scene/PlanetStateSlice";
import {messageStateReducer} from "./slices/app/MessagesStateSlice";
import {planetSceneReducer} from "./slices/scene/planetSceneSlice";


const rootReducer = combineReducers({
    appStateReducer,
    userDataReducer,
    planetStateReducer,
    messageStateReducer,
    planetSceneReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']