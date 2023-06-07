import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {planetStateSlice} from "../../../../reducers/slices/scene/PlanetStateSlice";
import {RequiredFields} from "../../../../types/functionsTS";
import FetchList from "../../../ui/base/scrollList/FetchList/FetchList";
import PlanetButton from "./ui/PlanetButton";
import {IPlanet} from "../../../../types/entities/planetType";

const PlanetPanel = () => {
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.userDataReducer.authUser)

    type RF = RequiredFields<IPlanet, 'textures' | 'plots' | 'color' | 'description'
        | 'rating' | 'plots_count' | 'type' | 'diameter'>[]

    const body = useMemo(() => {
        const basePlotsFields = ["mesh", "area", "owner", 'surfaceArea', 'cost', "isSale", "color",]
        const plotsFieldsIsAuth = authUser ? ['basket', 'owner', 'buying', 'markUp', 'price'] : []
        return {
            endpoint: 'planets/',
            body: {
                fields: ['textures', 'plots', 'color', 'description', "rating", "plots_count", "type", "diameter"],
                plots_fields: [...basePlotsFields, ...plotsFieldsIsAuth],
            },
            isToken: !!authUser,
        }
    }, [authUser]);

    const [allPlanets, setAllPlanets] = useState<RF>([]);

    useEffect(() => {
        if (allPlanets.length) {
            dispatch(planetStateSlice.actions.resetPlanets(allPlanets))
            dispatch(planetStateSlice.actions.setActivePlanetId(allPlanets[3].id))
        }
    }, [allPlanets]);

    return (
        <div className="store-panels-planets">
            { // @ts-ignore
                <FetchList size={9} returnList={setAllPlanets} {...body}>
                    {allPlanets.map((planet) => (
                        <PlanetButton key={planet.id} planet={planet}/>
                    ))}
                </FetchList>}
        </div>
    );
};

export default PlanetPanel;