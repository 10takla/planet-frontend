import React, {FC} from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {convertNumToUnit} from "../../../../helpers/convertations/numbers";

interface ISurfaceArea {
    area: number
}

const SurfaceArea: FC<ISurfaceArea> = ({area}) => {
    const areaUnit = useAppSelector(state => state.appStateReducer.areaUnit)


    return (
        <div>
            {convertNumToUnit(area, 0)} {areaUnit}
        </div>
    );
};

export default SurfaceArea;