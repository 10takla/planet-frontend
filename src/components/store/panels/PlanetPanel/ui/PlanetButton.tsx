import React, {FC, MouseEvent, useCallback, useMemo, useState} from 'react';
import {planetStateSlice} from "../../../../../reducers/slices/scene/PlanetStateSlice";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import PlanetScene from "../../../../ui/threejs/PlanetScene";
import {getAnyColor} from "../../../../../helpers/store/threejs";
import {IPlanet} from "../../../../../types/entities/planetType";
import {planetSceneSlice} from "../../../../../reducers/slices/scene/planetSceneSlice";

interface IPlanetButton {
    planet: IPlanet
}

const PlanetButton: FC<IPlanetButton> = ({planet}) => {
    const dispatch = useAppDispatch()
    const {activePlanetId} = useAppSelector(state => state.planetStateReducer)

    const handleOnClick = useCallback((event: MouseEvent<HTMLLIElement>) => {
        dispatch(planetStateSlice.actions.setActivePlanetId(planet.id))
    }, []);

    const onLiMouseEnter = useCallback((event: MouseEvent<HTMLLIElement>) => {
        // dispatch(planetSceneSlice.actions.setAction({data: ['planet', {rotationSpeed: 50}], slice: 'panel'}))
    }, []);

    const onLiMouseLeave = useCallback((event: MouseEvent<HTMLLIElement>) => {
        // dispatch(planetSceneSlice.actions.setAction({data: ['planet', {rotationSpeed: 0}], slice: 'panel'}))
    }, []);

    return (
        <li className={['selectable', planet.id === activePlanetId ? 'active' : ''].join(' ')}
            onClick={handleOnClick}
            onMouseEnter={onLiMouseEnter}
            onMouseLeave={onLiMouseLeave}
            style={{background: getAnyColor(planet.color!, 0, 50,)}}
        >
            <span>{planet.name}</span>
            <PlanetScene slice={'panel'} planet={planet}/>
        </li>
    );
};

export default PlanetButton;