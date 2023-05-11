import React, {useCallback, useEffect, useState} from 'react';
import {fetchPlanetsData} from "../../../../reducers/ActionCreator";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {IPlanet} from "../../../../types/store/threejs/planetObjectsTypes";
import {planetStateSlice} from "../../../../reducers/slices/PlanetStateSlice";
import PlanetButton from "./ui/PlanetButton";

const PlanetPanel = () => {
    const dispatch = useAppDispatch()
    const {planets} = useAppSelector(state => state.planetStateReducer)
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const data: [string, any][] = [
            ["fields", ['textures', 'plots', 'color']],
            ["search", search],
            ["to", 6]
        ]
        fetchPlanetsData("planets/", false, data)
            .then((planets: IPlanet[]) => {
                dispatch(planetStateSlice.actions.resetPlanets(planets))
                dispatch(planetStateSlice.actions.setActivePlanet(planets[3]))
            })
            .catch(error => console.log(error))
    }, [search]);


    return (
        <div className="store-panels-planets">
            <input placeholder="поиск" onChange={e => setSearch(e.target.value)}/>
            <div className="list">
                {planets.map((planet) => (
                    <PlanetButton key={planet.id} planet={planet}/>
                ))}
            </div>
        </div>
    );
};

export default PlanetPanel;