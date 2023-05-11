import React, {FC, useMemo, useRef} from 'react';
import {Html} from "@react-three/drei";
import {IPlot} from "../../../../types/store/threejs/planetObjectsTypes";
import {useAppSelector} from "../../../../hooks/redux";

interface IPlanetHtml extends React.HTMLProps<any> {

}

const PlanetHtml: FC<IPlanetHtml> = ({children, ...props}) => {

    return (
        <div></div>
    )
};

export default Html;