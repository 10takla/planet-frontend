import React, {useEffect} from 'react';
import CombinePanels from "./panels/CombinePanels";
import PlanetScene from "../ui/threejs/PlanetScene";
import {useAppSelector} from "../../hooks/redux";
import {IPlanet} from "../../types/entities/planetType";
import UserFocus from "../ui/userViews/UserFocus";
import {usePlanet} from "../../hooks/useDataById";

const StoreCombine = () => {
    const planet = usePlanet()
    useEffect(() => {
        // console.log(planet)
    }, [planet]);
    return (
        <div className={["store"].join(' ')}>
            {planet &&
                <PlanetScene slice={'store'}
                             planet={planet}/>
            }
            <CombinePanels/>
        </div>
    );
};

export default StoreCombine;