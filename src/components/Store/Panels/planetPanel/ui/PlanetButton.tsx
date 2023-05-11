import React, {FC, useCallback, useMemo, useState} from 'react';
import {planetStateSlice} from "../../../../../reducers/slices/PlanetStateSlice";
import {IPlanet} from "../../../../../types/store/threejs/planetObjectsTypes";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import PlanetScene from "../../../../UI/Threejs/PlanetScene";
import {getAnyColor} from "../../../../../helpers/store/threejs";
import {planetPanelSettings} from "../../../../../configs/scene/sceneSettings";
import {ISceneProperties} from "../../../../../types/store/threejs/sceneTypes";

interface IPlanetButton {
    planet: IPlanet
}

const PlanetButton: FC<IPlanetButton> = ({planet}) => {
    const dispatch = useAppDispatch()
    const {activePlanet} = useAppSelector(state => state.planetStateReducer)

    const handleOnClick = useCallback((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        dispatch(planetStateSlice.actions.setActivePlanet(planet))
    }, [])
    const [isRotation, setIsRotation] = useState(false);

    const settings = useMemo(() => {
        planetPanelSettings.planetProperties.actions.ranges.rotationSpeed = isRotation ? 50: 0

        return {...planetPanelSettings,}
    }, [isRotation]);

    return (
        <li className={['selectable', planet.id === activePlanet?.id ? 'active' : ''].join(' ')}
            onClick={handleOnClick}
            onMouseEnter={e => setIsRotation(true)}
            onMouseLeave={e => setIsRotation(false)}
            style={{background: getAnyColor(planet.color!, 0, 50,)}}
        >
            <span>{planet.name}</span>
            <PlanetScene planet={planet} {...settings}/>
        </li>
    );
};

export default PlanetButton;