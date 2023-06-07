import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPlot} from "../../../types/entities/plotType";
import {IPlanet, IStorePlanet} from "../../../types/entities/planetType";

interface IPlanetState {
    planets: IStorePlanet[]
    plots: IPlot[]
    activePlanetId: IPlanet["id"] | null
    activePlotId: IPlot["id"] | null
    focusPlotId: IPlot['id'] | null
}

const initialState: IPlanetState = {
    planets: [],
    plots: [],
    activePlanetId: null,
    activePlotId: null,
    focusPlotId: null,
}

interface IChangePlot {
    plotId: IPlot['id']
    change: { [key in keyof IPlot]?: IPlot[key] }
}

export const planetStateSlice = createSlice({
    name: 'planetSettings',
    initialState,
    reducers: {
        changePlot(state, action: PayloadAction<IChangePlot>) {
            const planetIndex = state.planets.findIndex(planet => planet.id === state.activePlanetId!)
            if (planetIndex !== -1) {
                const plotIndex = state.planets[planetIndex].plots.findIndex(plot => plot.id === action.payload.plotId)
                if (plotIndex !== -1) {
                    const plot = state.planets[planetIndex].plots[plotIndex]
                    state.planets[planetIndex].plots[plotIndex] = {...plot, ...action.payload.change}
                }
            }
        },
        setActivePlanetId(state, action: PayloadAction<IPlanet['id']>) {
            state.activePlanetId = action.payload
        },
        setActivePlotId(state, action: PayloadAction<IPlot['id']>) {
            state.activePlotId = action.payload
        },
        setFocusPlotId(state, action: PayloadAction<IPlot['id']>) {
            state.focusPlotId = action.payload
        },
        setPlanets(state, action: PayloadAction<IStorePlanet[] | IPlanet>) {
            if (Array.isArray(action.payload)) {
                state.planets = [...state.planets, ...action.payload];
            } else {
                let planet = action.payload as IStorePlanet
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
        resetPlanets(state, action: PayloadAction<IStorePlanet[]>) {
            state.planets = action.payload;
        },
        setPlots(state, action: PayloadAction<IPlot[] | IPlot>) {
            if (Array.isArray(action.payload)) {
                state.plots = [...state.plots, ...action.payload];
            } else {
                state.plots = [...state.plots, action.payload];
            }
        },
    }
})

export const planetStateReducer = planetStateSlice.reducer


