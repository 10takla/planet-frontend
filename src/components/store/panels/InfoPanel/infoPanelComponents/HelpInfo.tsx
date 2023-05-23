import React, {useMemo} from 'react';
import AnimationByCss from "../../../../ui/animations/AnimationByCss";
import {useAppSelector} from "../../../../../hooks/redux";
import {storeSettings} from "../../../../../configs/scene settings/store";
import {ASSETS_URL} from "../../../../../config";
import {usePlanet} from "../../../../../hooks/useDataById";

const HelpInfo = () => {
    const {help} = useAppSelector(state => state.storeStateReducer.actionPanel.buttons)
    const activePlanet = usePlanet()

    const isOwned = useMemo(() => {
        return storeSettings.planetProperties.plotsProperties?.materials.isOwned.getMaterial(
            activePlanet?.color)
    }, [activePlanet])

    const isMeOwned = useMemo(() => {
        return storeSettings.planetProperties.plotsProperties?.materials.isMeOwned.getMaterial(
            activePlanet?.color)
    }, [activePlanet])

    return (
        <AnimationByCss in={help}
                        classNames="store-animation-panels"
                        timeout="--animation-duration-panels"
                        mountOnEnter unmountOnExit>
            <div className="store-panels-info-help">
                <li>
                    <img src={ASSETS_URL + "/images/mouse left click.svg"}/>
                    <span><b>медленное</b> перемещение</span>
                </li>
                <li>
                    <img src={ASSETS_URL + "/images/mouse right click.svg"} alt='sss'/>
                    <span><b>быстрое</b> перемещение</span>
                </li>
                {activePlanet?.id &&
                    <li className={'planet-color'}>
                        <div className={'block-color'}
                             style={{background: activePlanet?.color} as any}
                        >
                            <div className={'color'}
                                 style={{background: isOwned?.color} as any}></div>
                        </div>
                        <span>- цвет занятых участков</span>
                    </li>}
                {activePlanet?.id &&
                    <li className={'planet-color'}>
                        <div className={'block-color'}
                             style={{background: activePlanet?.color} as any}
                        >
                            <div className={'color'}
                                 style={{background: isMeOwned?.color} as any}></div>
                        </div>
                        <span>- цвет ваших участков участков</span>
                    </li>}
            </div>
        </AnimationByCss>
    );
};

export default HelpInfo;