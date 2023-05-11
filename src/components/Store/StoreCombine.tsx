import React, {useMemo} from 'react';
import CombinePanels from "./Panels/CombinePanels";
import PlanetScene from "../UI/Threejs/PlanetScene";
import {useAppSelector} from "../../hooks/redux";
import {storeSettings} from "../../configs/scene/sceneSettings";

const StoreCombine = () => {
    const {activePlanet} = useAppSelector(state => state.planetStateReducer)
    const {ranges, buttons, selectors} = useAppSelector(state => state.storeStateReducer.actionPanel)

    const settings = useMemo(() => {
        storeSettings.planetProperties.actions.ranges.rotationSpeed = ranges.planetRotation
        storeSettings.planetProperties.actions.buttons.isGrid = buttons.grid
        storeSettings.planetProperties.actions.buttons.isCloud = buttons.cloud
        storeSettings.planetProperties.actions.buttons.isShadow = buttons.shadow
        storeSettings.planetProperties.actions.selectors.resolution = selectors.resolution

        storeSettings.plotsProperties!.actions.buttons.isPlotGrid = buttons.plotGrid
        storeSettings.plotsProperties!.actions.buttons.isGrid = buttons.plots
        storeSettings.plotsProperties!.actions.buttons.isDashboard = buttons.dashboard
        storeSettings.plotsProperties!.actions.buttons.isUserGrid = buttons.userGrid
        storeSettings.plotsProperties!.actions.buttons.isUserSearch = buttons.userSearch

        storeSettings.orbitControl!.actions.ranges.cameraRotation = ranges.cameraRotation
        return storeSettings
    }, [ranges, buttons, selectors]);

    return (
        <div className="store">
            <PlanetScene {...settings} planet={activePlanet!}/>
            <CombinePanels/>
        </div>
    );
};

export default StoreCombine;