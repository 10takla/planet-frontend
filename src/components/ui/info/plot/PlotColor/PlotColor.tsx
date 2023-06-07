import React, {CSSProperties, FC, useMemo} from 'react';
import {IPlanet} from "../../../../../types/entities/planetType";
import {getAnyColor} from "../../../../../helpers/store/threejs";
import "./plotColor.scss"

interface IPlotColor {
    planetColor: IPlanet['color']
    offset: number
    color: CSSProperties['color']
}

const PlotColor: FC<IPlotColor> = ({planetColor, color}) => {

    return (
        <div className={'block-color'}
             style={{background: planetColor} as any}
        >
            <div className={'color'}
                 style={{background: color} as any}></div>
        </div>
    );
};

export default PlotColor;