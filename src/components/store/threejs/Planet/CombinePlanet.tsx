import React, {FC, Suspense, useRef} from 'react';
import Loading from "../Loadings/Loading";
import Planet from "./Planet";
import {useAppSelector} from "../../../../hooks/redux";
import {IPlanetProperties} from "../../../../types/store/threejs/planetObjectsTypes";

interface ICombinePlanet extends IPlanetProperties {

}

const CombinePlanet: FC<ICombinePlanet> = ({...props}) => {
    const {grid, cloud, plots} = useAppSelector(state => state.storeStateReducer.actionPanel.buttons)
    const planetRef = useRef<any>();
    const {activePlanet} = useAppSelector(state => state.planetStateReducer)
    console.log(props.plotsProperties)
    return (
        <Suspense fallback={<Loading/>}>
            <Planet {...props} planet={activePlanet!} planetRef={planetRef}>
                {/*{plots && props.plotsProperties &&*/}
                {/*      <CombinePlots {...props.plotsProperties} scale={1.01} planetRef={planetRef}>*/}
                {/*     */}
                {/*      </CombinePlots>*/}
                {/*}*/}
            </Planet>
        </Suspense>
    );
};

export default CombinePlanet;