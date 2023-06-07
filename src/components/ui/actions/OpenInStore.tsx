import React, {FC, useCallback} from 'react';
import {ASSETS_URL} from "../../../config";
import HoverDescription from "../info/HoverDescription/HoverDescription";
import {useAppDispatch} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/app/AppStateSlice";
import {planetStateSlice} from "../../../reducers/slices/scene/PlanetStateSlice";
import {RequiredFields} from "../../../types/functionsTS";
import {IPlot} from "../../../types/entities/plotType";
import {planetSceneSlice} from "../../../reducers/slices/scene/planetSceneSlice";

interface IOpenInStore {
    plot: RequiredFields<IPlot, | 'planet'>
}

const OpenInStore: FC<IOpenInStore> = ({plot}) => {
    const dispatch = useAppDispatch()
    const handleOnClick = useCallback(() => {
        dispatch(planetSceneSlice.actions.setAction({data: ['plots', {'isPlots': true}], slice: 'store'}))
        dispatch(planetSceneSlice.actions.setAction({data: ['plots', {'isDashboardUser': false}], slice: 'store'}))

        dispatch(appStateSlice.actions.setActiveModal(null))
        dispatch(planetStateSlice.actions.setActivePlanetId(plot.planet.id))
        dispatch(planetStateSlice.actions.setActivePlotId(plot.id))
        dispatch(planetStateSlice.actions.setFocusPlotId(plot.id))

    }, [plot]);

    return (
        <HoverDescription className={'openInStore'} onClick={handleOnClick} description={'Открыть в магазине'}>
            <img style={{width: '4em'}} src={ASSETS_URL + "/images/planet.svg"}/>
        </HoverDescription>
    );
};

export default OpenInStore;