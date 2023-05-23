import React, {FC, useEffect} from 'react';
import {Html} from "@react-three/drei";
import {useAppSelector} from "../../../../hooks/redux";
import {IPlotProperties} from "../../../../types/store/threejs/sceneTypes";
import {IPlotForStore} from "../../../../types/store/threejs/planetObjectsTypes";

interface IHtmlPlot extends IPlotProperties {
    plot: IPlotForStore
    center: [number, number, number]
    children: React.ReactNode
}

const HtmlPlot: FC<IHtmlPlot> = ({center, plot, children, ...props}) => {
    return (
        <Html as='div' center={true} position={center}
              occlude={[]}
              zIndexRange={[90]}
              distanceFactor={5 * plot.area ** 0.2}
              className={'store-window-plot'}>
            {children}
        </Html>
    );
};

export default HtmlPlot;