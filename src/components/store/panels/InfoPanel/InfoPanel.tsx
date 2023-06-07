import React from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import HelpInfo from "./infoPanelComponents/HelpInfo";
import PlotInfo from "./infoPanelComponents/plotInfo/PlotInfo";
import PlanetInfo from "./infoPanelComponents/PlanetInfo";
import {usePlanet, usePlot} from "../../../../hooks/useDataById";

const InfoPanel = () => {
    const isHelp = useAppSelector(state => state.planetSceneReducer.store.actions.canvas.isHelp)
    const planet = useAppSelector(state => state.planetSceneReducer.store.actions.planet)
    const plots = useAppSelector(state => state.planetSceneReducer.store.actions.plots)

    const activePlanet = usePlanet()
    const activePlot = usePlot()

    return (
        <div className="store-panels-info">
            {isHelp ? <HelpInfo/>
                : <React.Fragment>
                    {planet.isBadge && activePlanet && !activePlot &&
                        <PlanetInfo/>}
                    {activePlot && plots.isPlotBadge &&
                        <PlotInfo/>
                    }
                </React.Fragment>
            }
        </div>
    );
};

export default InfoPanel;