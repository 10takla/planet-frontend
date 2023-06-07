import React, {useMemo} from 'react';
import AnimationByCss from "../../../../ui/animations/AnimationByCss";
import {useAppSelector} from "../../../../../hooks/redux";
import {ASSETS_URL} from "../../../../../config";
import {usePlanet} from "../../../../../hooks/useDataById";
import PlotColor from "../../../../ui/info/plot/PlotColor/PlotColor";
import {getAnyColor} from "../../../../../helpers/store/threejs";

const HelpInfo = () => {
    const {isHelp} = useAppSelector(state => state.planetSceneReducer.store.actions.canvas)
    const activePlanet = usePlanet()

    const {
        owned,
        ownedByMe,
        isNotSale
    } = useAppSelector(state => state.planetSceneReducer.store.scene.plots?.materials!)

    const list = useMemo(() => {
        return [
            {description: 'занятые участки', material: owned},
            {description: 'ваши участки', material: ownedByMe},
            {description: 'участки не продаются', material: isNotSale},
        ]
    }, []);

    return (
        <AnimationByCss in={isHelp}
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
                {activePlanet?.color &&
                    list.map(item =>
                        <li className={'planet-color'}>
                            <div className={'block-color'}
                                 style={{background: activePlanet.color} as any}
                            >
                                <div className={'color'}
                                     style={{
                                         background: item.material.offsetColor ?
                                             getAnyColor(activePlanet.color, item.material.offsetColor)
                                             : item.material.color
                                     } as any}>

                                </div>
                            </div>
                            <span>- {item.description}</span>
                        </li>
                    )
                }
            </div>
        </AnimationByCss>
    );
};

export default HelpInfo;