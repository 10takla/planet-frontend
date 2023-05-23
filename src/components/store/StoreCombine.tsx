import React, {useEffect, useMemo} from 'react';
import CombinePanels from "./panels/CombinePanels";
import PlanetScene from "../ui/threejs/PlanetScene";
import {useAppSelector} from "../../hooks/redux";
import {storeSettings} from "../../configs/scene settings/store";
import {IPlanet} from "../../types/store/threejs/planetObjectsTypes";

const StoreCombine = () => {
    const {activePlanetId, planets, plots, cameraFocus} = useAppSelector(state => state.planetStateReducer)
    const {ranges, buttons, selectors} = useAppSelector(state => state.storeStateReducer.actionPanel)

    const settings = useMemo(() => {
        storeSettings.planetProperties.actions.ranges.rotationSpeed = ranges.planetRotation
        storeSettings.planetProperties.actions.buttons.isGrid = buttons.grid
        storeSettings.planetProperties.actions.buttons.isCloud = buttons.cloud
        storeSettings.planetProperties.actions.buttons.isShadow = buttons.shadow
        storeSettings.planetProperties.actions.selectors.resolution = selectors.resolution

        storeSettings.planetProperties.plotsProperties!.actions.buttons.isPlots = buttons.plots
        storeSettings.planetProperties.plotsProperties!.actions.buttons.isUserPlots = buttons.userSearch
        storeSettings.planetProperties.plotsProperties!.actions.buttons.isMyPlot = buttons.myPlot
        storeSettings.planetProperties.plotsProperties!.actions.buttons.isUserGrid = buttons.userGrid
        storeSettings.planetProperties.plotsProperties!.actions.buttons.isDashboardUser = buttons.dashboardUser
        storeSettings.planetProperties.plotsProperties!.actions.buttons.isDashboard = buttons.dashboard
        storeSettings.planetProperties.plotsProperties!.actions.buttons.isPlotGrid = buttons.plotGrid
        storeSettings.orbitControl!.actions!.ranges.cameraRotation = ranges.cameraRotation
        return storeSettings
    }, [ranges, buttons, selectors, storeSettings]);

    const {fullscreen} = useAppSelector(state => state.storeStateReducer.actionPanel.buttons)

    return (
        <div className={["store"].join(' ')}>
            {activePlanetId && planets.length &&
                <PlanetScene {...settings} cameraFocus={cameraFocus}
                             planet={planets.find(planet => planet.id === activePlanetId) as IPlanet}/>}
            <CombinePanels/>
        </div>
    );
};

export default StoreCombine;