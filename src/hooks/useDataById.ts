import {useAppDispatch, useAppSelector} from "./redux";
import {useMemo} from "react";
import {IPlot, IPlotForStore} from "../types/entities/plotType";
import {IStorePlanet} from "../types/entities/planetType";
import {RequiredFields} from "../types/functionsTS";

export const usePlanet = <T = IStorePlanet>() => {
    const {activePlanetId, planets} = useAppSelector((state => state.planetStateReducer))

    const activePlanet = useMemo(() => {
        return planets.find(planet => planet.id === activePlanetId) ?? null
    }, [activePlanetId, planets])

    return activePlanet as T | null
}
export const usePlot = <T = IPlotForStore>() => {
    const {activePlotId} = useAppSelector((state => state.planetStateReducer))
    const planet = usePlanet()
    const activePlot = useMemo(() => {
        return planet?.plots?.find(plot => plot.id === activePlotId) ?? null
    }, [activePlotId, planet])

    return activePlot as T | null;
}