import React from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import HelpInfo from "./infoPanelComponents/HelpInfo";
import PlotInfo from "./infoPanelComponents/PlotInfo";
import PlanetInfo from "./infoPanelComponents/PlanetInfo";

const InfoPanel = () => {
    const {activePlot, activePlanet} = useAppSelector(state => state.planetStateReducer)
    const {help, plotBadge, badge} = useAppSelector(state => state.storeStateReducer.actionPanel.buttons)

    return (
        <div className="store-panels-info">
            {help && <HelpInfo/>}
            {!help && badge && activePlanet?.id && !plotBadge && <PlanetInfo/>}
            {!help && badge && activePlot?.id && plotBadge && <PlotInfo/>}
        </div>
    );
};

export default InfoPanel;