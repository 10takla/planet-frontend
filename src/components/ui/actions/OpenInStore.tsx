import React, {FC, useCallback, useMemo} from 'react';
import {ASSETS_URL} from "../../../config";
import HoverDescription from "../info/HoverDescription/HoverDescription";
import {IPlot} from "../../../types/store/threejs/planetObjectsTypes";
import {useAppDispatch} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/AppStateSlice";
import {planetStateSlice} from "../../../reducers/slices/PlanetStateSlice";
import {RequiredFields} from "../../../types/functionsTS";
import {storeStateSlice} from "../../../reducers/slices/StoreStateSlice";

interface IOpenInStore {
    plot: RequiredFields<IPlot, | 'planet'>
}

const OpenInStore: FC<IOpenInStore> = ({plot}) => {
    const dispatch = useAppDispatch()
    const handleOnClick = useCallback(() => {
        dispatch(storeStateSlice.actions.setActionPanel({'plots': true}))
        dispatch(storeStateSlice.actions.setActionPanel({'dashboardUser': false}))

        dispatch(appStateSlice.actions.setActiveModal(null))
        dispatch(planetStateSlice.actions.setActivePlanetId(plot.planet.id))
        dispatch(planetStateSlice.actions.setActivePlotId(plot.id))
        dispatch(planetStateSlice.actions.setFocusPlotId(plot.id))

    }, [plot]);

    return (
        <HoverDescription onClick={handleOnClick} description={'Открыть в магазине'}>
            <img style={{width: '4em'}} src={ASSETS_URL + "/images/planet.svg"}/>
        </HoverDescription>
    );
};

export default OpenInStore;