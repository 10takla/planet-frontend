import {useAppSelector} from "./redux";
import {useMemo} from "react";

export const usePlanet = () => {
    const {activePlanetId, planets} = useAppSelector((state => state.planetStateReducer))

    const activePlanet = useMemo(() => {
        return planets.find(planet => planet.id === activePlanetId) ?? null
    }, [activePlanetId, planets])

    return activePlanet
}
export const usePlot = () => {
    const {activePlotId, plots} = useAppSelector((state => state.planetStateReducer))

    const activePlot = useMemo(() => {
        return plots.find(plot => plot.id === activePlotId) ?? null
    }, [activePlotId, plots])

    return activePlot
}