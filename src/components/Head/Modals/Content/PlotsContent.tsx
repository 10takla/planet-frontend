import React, {useEffect, useState} from 'react';
import {fetchPlanetsData} from "../../../../reducers/ActionCreator";
import {useAppDispatch} from "../../../../hooks/redux";
import {IPlot} from "../../../../types/store/threejs/planetObjectsTypes";

const PlotsContent = () => {
    const dispatch = useAppDispatch()
    const [plots, setPlots] = useState<IPlot[]>([]);

    // useEffect(() => {
    //     fetchPlanetsData(dispatch, 'planets/plots/', true, ['plots', 'mass'])
    //         .then(data => setPlots(data))
    // }, []);

    return (
        <div className="modal-content-plots">
            {plots.map(plot => (
                <li style={{background: plot.color}}>
                    <div>{plot.id}</div>
                    <div>{plot.name}</div>
                    <div>{plot.area!.toFixed(4)}</div>
                    <div>{}</div>
                </li>
            ))}
        </div>
    );
};

export default PlotsContent;