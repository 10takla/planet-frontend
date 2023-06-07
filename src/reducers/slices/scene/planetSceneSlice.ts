import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPlot} from "../../../types/entities/plotType";
import {IEventsScene, ISliceState} from "../../../types/store/scene/sceneTypes";
import {IPlanet} from "../../../types/entities/planetType";
import {ChangeActionType} from "../../../types/store/scene/actionsTypes";
import {storeSlice} from "../../../configs/sceneSlices/store.config";
import {panelSlice} from "../../../configs/sceneSlices/panel.config";
import {planetInfoSlice} from "../../../configs/sceneSlices/planetPanel.config";
import {ICameraFocus} from "../../../types/store/scene/properties/cameraProperties";

export type SlicePlanetSceneType = 'store' | 'panel' | 'planetInfo'

type ChangePerKey<T> = {data: T,  slice: SlicePlanetSceneType }

const initialState: Record<SlicePlanetSceneType, ISliceState> = {
    store: storeSlice,
    panel: panelSlice,
    planetInfo: planetInfoSlice
}

export const planetSceneSlice = createSlice({
    name: 'planetScene',
    initialState,
    reducers: {
        setEvent(state, action: PayloadAction<ChangePerKey<{ [K in keyof IEventsScene]?: IEventsScene[K] }>>) {
            const events = state[action.payload.slice].events
            state[action.payload.slice].events = {...events, ...action.payload.data}
        },
        setActivePlanetId(state, action: PayloadAction<ChangePerKey<IPlanet['id'] | null>>) {
            state[action.payload.slice].activePlanetId = action.payload.data
            state[action.payload.slice].activePlotId = null
        },
        setActivePlotId(state, action: PayloadAction<ChangePerKey<IPlot['id'] | null>>) {
            state[action.payload.slice].activePlotId = action.payload.data
        },
        setAction(state, action: PayloadAction<ChangePerKey<ChangeActionType>>) {
            const actions = state[action.payload.slice].actions
            actions[action.payload.data[0]] = {...actions[action.payload.data[0]], ...action.payload.data[1]}
            state[action.payload.slice].actions = {...actions, ...action.payload.data}
        },
        setCameraFocus(state, action: PayloadAction<ChangePerKey<ICameraFocus>>) {
            state[action.payload.slice].scene.camera.focus = action.payload.data
        },
    }
})

export const planetSceneReducer = planetSceneSlice.reducer


