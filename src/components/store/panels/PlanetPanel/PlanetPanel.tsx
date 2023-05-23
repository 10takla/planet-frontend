import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../../../../hooks/redux";
import {IPlanet} from "../../../../types/store/threejs/planetObjectsTypes";
import {planetStateSlice} from "../../../../reducers/slices/PlanetStateSlice";
import {useFetch} from "../../../../hooks/useFetch";
import {RequiredFields} from "../../../../types/functionsTS";
import FetchList from "../../../ui/base/scrollList/FetchList/FetchList";
import PlanetButton from "./ui/PlanetButton";

const PlanetPanel = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>('');
    type RF = RequiredFields<IPlanet, 'textures' | 'plots' | 'color'>[]
    const [planets, isWaiting] = useFetch<IPlanet, RF>({
        endpoint: 'planets/',
        body: {
            fields: ['textures', 'plots', 'color'],
            plots_fields: ["mesh", "area", "user"],
            search: search,
            to: 6
        }
    }, [search])

    useEffect(() => {
        if (planets) {
            dispatch(planetStateSlice.actions.resetPlanets(planets))
            dispatch(planetStateSlice.actions.setActivePlanetId(planets[3].id))
        }
    }, [planets]);

    const body = {
        endpoint: 'planets/',
        body: {
            fields: ['textures', 'plots', 'color'],
            plots_fields: ["mesh", "area", "user"],
        },
        isToken: true,
    }

    const [allPlanets, setAllPlanets] = useState<RF>([]);

    return (
        <div className="store-panels-planets">
            { // @ts-ignore
                <FetchList size={10} returnList={setAllPlanets} {...body}>
                    {allPlanets?.map((planet) => (
                        <PlanetButton key={planet.id} planet={planet}/>
                    ))}
                </FetchList>}
        </div>
    );
};

export default PlanetPanel;