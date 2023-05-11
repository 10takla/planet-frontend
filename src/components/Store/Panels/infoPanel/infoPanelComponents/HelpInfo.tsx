import React from 'react';
import AnimationByCss from "../../../../UI/Animation/AnimationByCss";
import {useAppSelector} from "../../../../../hooks/redux";
import PlanetScene from "../../../../UI/Threejs/PlanetScene";
import {planetPanelSettings} from "../../../../../configs/scene/sceneSettings";

const HelpInfo = () => {
    const {help} = useAppSelector(state => state.storeStateReducer.actionPanel.buttons)

    return (
        <AnimationByCss in={help}
                        classNames="store-animation-panels"
                        timeout="--animation-duration-panels"
                        mountOnEnter unmountOnExit>
            <div className="store-panels-info-help">
                <li>
                    <img src="/assets/images/mouse left click.svg"/>
                    <span><b>медленное</b> вращение</span>
                </li>
                <li>
                    <img src="/assets/images/mouse right click.svg" alt='sss'/>
                    <span><b>быстрое</b> вращение</span>
                </li>
            </div>
        </AnimationByCss>
    );
};

export default HelpInfo;