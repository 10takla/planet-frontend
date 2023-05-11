import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import HelpInfo from "./infoPanelComponents/HelpInfo";
import PlotInfo from "./infoPanelComponents/PlotInfo";
import PlanetInfo from "./infoPanelComponents/PlanetInfo";
import {planetPanelSettings} from "../../../../configs/scene/sceneSettings";
import PlanetScene from "../../../UI/Threejs/PlanetScene";

const InfoPanel = () => {
    const {activePlot, activePlanet} = useAppSelector(state => state.planetStateReducer)
    const {help, plotBadge} = useAppSelector(state => state.storeStateReducer.actionPanel.buttons)

    return (
        <div className="store-panels-info">
            {help && <HelpInfo/>}
            {!help && activePlanet?.id && <PlanetInfo/>}
            {!help && activePlot?.id && plotBadge && <PlotInfo/>}
        </div>
    );
};

export default InfoPanel;