import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPlanet, IPlot} from "../../types/store/threejs/planetObjectsTypes";

export interface ICameraFocus {
    center?: [number, number, number],
    factorRange: number
}


interface IPlanetState {
    planets: IPlanet[]
    plots: IPlot[]
    activePlanet: IPlanet | null
    activePlot: IPlot | null
    cameraFocus: ICameraFocus
    activePlanetId: IPlanet["id"] | null
    activePlotId: IPlot["id"] | null
    focusPlotId: IPlot['id'] | null
}

const initialState: IPlanetState = {
    planets: [],
    plots: [],
    activePlanet: null,
    activePlot: null,
    cameraFocus: {factorRange: 1},
    activePlanetId: null,
    activePlotId: null,
    focusPlotId: null,
}

export const planetStateSlice = createSlice({
    name: 'planetSettings',
    initialState,
    reducers: {
        setActivePlanetId(state, action: PayloadAction<IPlanet['id']>){
            state.activePlanetId = action.payload
        },
        setActivePlotId(state, action: PayloadAction<IPlot['id']>){
            state.activePlotId = action.payload
        },
        setFocusPlotId(state, action: PayloadAction<IPlot['id']>){
            state.focusPlotId = action.payload
        },
        setPlanets(state, action: PayloadAction<IPlanet[] | IPlanet>) {
            if (Array.isArray(action.payload)) {
                state.planets = [...state.planets, ...action.payload];
            } else {
                let planet = action.payload as IPlanet
                let planets = state.planets
                const index = state.planets.findIndex(p => p.id === planet.id)
                if (index) {
                    planet = {...planets[index], ...planet}
                    planets = state.planets.filter(p => p.id !== planet.id)
                    state.planets[index] = planet
                } else {
                    state.planets = [...planets, planet]
                }
            }
        },
        resetPlanets(state, action: PayloadAction<IPlanet[]>) {
            state.planets = action.payload;
        },
        setActivePlanet(state, action: PayloadAction<IPlanet>) {
            state.activePlanet = {...state.activePlanet, ...action.payload};
        },
        setPlots(state, action: PayloadAction<IPlot[] | IPlot>) {
            if (Array.isArray(action.payload)) {
                state.plots = [...state.plots, ...action.payload];
            } else {
                state.plots = [...state.plots, action.payload];
            }
        },
        setActivePlot(state, action: PayloadAction<IPlot>) {
            state.activePlot = {...state.activePlot, ...action.payload};
        },
        setCameraFocus(state, action: PayloadAction<IPlanetState["cameraFocus"]>) {
            state.cameraFocus = {...state.cameraFocus, ...action.payload}
        },
    }
})

export const planetStateReducer = planetStateSlice.reducer


