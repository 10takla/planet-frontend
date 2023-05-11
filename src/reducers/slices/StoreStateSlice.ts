import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPlanet, IPlot} from "../../types/store/threejs/planetObjectsTypes";
import {ChangeActionType, IActionPanel} from "../../types/store/panels/actionPanelTypes";

interface IAppState {
    activePlanetId: IPlanet['id'] | null
    activePlotId: IPlot['id'] | null
    actionPanel: IActionPanel
    events: {
        orbitRotation: boolean
        hoverScene: boolean
        isStopCameraAnimation: boolean
        isRepeatCameraAnimation: boolean
        isActiveCameraAnimation: boolean
    }
}

const initialState: IAppState = {
    activePlanetId: null,
    activePlotId: null,
    events: {
        orbitRotation: false,
        hoverScene: true,
        isStopCameraAnimation: false,
        isRepeatCameraAnimation: false,
        isActiveCameraAnimation: false
    },
    actionPanel: {
        buttons: {
            help: false,
            fullscreen: false,
            grid: false,
            shadow: false,
            cloud: true,
            userSearch: true,
            plots: true,
            userGrid: false,
            plotGrid: true,
            plotBadge: false,
            dashboard: false
        },
        ranges: {
            planetRotation: 0, cameraRotation: 0,
            sound: 40,
        },
        selectors: {
            resolution: '2K'
        }
    },
}

export const storeStateSlice = createSlice({
    name: 'storeSettings',
    initialState,
    reducers: {
        setEvent(state, action: PayloadAction<{ [key in keyof IAppState["events"]]?: boolean }>) {
            state.events = {...state.events, ...action.payload}
        },
        setActivePlanetId(state, action: PayloadAction<IPlanet['id'] | null>) {
            state.activePlanetId = action.payload
            state.activePlotId = null
        },
        setActivePlotId(state, action: PayloadAction<IPlot['id'] | null>) {
            state.activePlotId = action.payload
        },
        setActionPanel(state, action: PayloadAction<ChangeActionType>) {
            if (typeof action.payload == "object") {
                if (typeof Object.values(action.payload)[0] === "number") {
                    state.actionPanel.ranges = {...state.actionPanel.ranges, ...action.payload}
                }
                if (typeof Object.values(action.payload)[0] === "string") {
                    state.actionPanel.selectors = {...state.actionPanel.selectors, ...action.payload}
                }
            } else {
                state.actionPanel.buttons[action.payload] = !state.actionPanel.buttons[action.payload]
            }
        },
    }
})

export const storeStateReducer = storeStateSlice.reducer


