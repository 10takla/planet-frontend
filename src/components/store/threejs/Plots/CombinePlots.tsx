import React, {FC} from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {IPlanet, IPlotForStore} from "../../../../types/store/threejs/planetObjectsTypes";
import {Object3D} from "three";
import Plot from "./Plot";
import {IPlotProperties} from "../../../../types/store/threejs/sceneTypes";

interface ICombinePlot extends IPlotProperties {
    children?: React.ReactNode
    planetRef?: React.RefObject<Object3D>
    plots: IPlotForStore[]
    planet: IPlanet
}


const CombinePlots: FC<ICombinePlot> = ({planetRef = true, plots, planet, children, ...props}) => {
    const {activePlotId} = useAppSelector(state => state.planetStateReducer)

    return (
        <group scale={props.radius}>
            {plots.map((plot, i) =>
                <Plot activePlotId={activePlotId} planet={planet} {...props} key={i} plot={plot}>

                </Plot>
            )}
        </group>
    );
};

export default CombinePlots;