import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import AnimationByCss from "../../../../ui/animations/AnimationByCss";
import {planetStateSlice} from "../../../../../reducers/slices/PlanetStateSlice";
import {getAnyColor} from "../../../../../helpers/store/threejs";
import PlanetScene from "../../../../ui/threejs/PlanetScene";
import {planetInfoSettings} from "../../../../../configs/scene settings/planetInfo";
import {gsap} from "gsap";
import {MeshPhongMaterialParameters} from "three";
import AnimationTextPrinting from "../../../../ui/animations/AnimationTextPrinting";
import {ASSETS_URL} from "../../../../../config";
import {RequiredFields} from "../../../../../types/functionsTS";
import {IPlanet} from "../../../../../types/store/threejs/planetObjectsTypes";
import {useFetch} from "../../../../../hooks/useFetch";

const PlanetInfo = () => {
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(true);
    const {activePlanet} = useAppSelector(state => state.planetStateReducer)
    type RF = 'description' | 'color' | 'rating' | 'plots_count' | 'type' | 'diameter'
    const [planet, isWaiting] = useFetch<IPlanet, RequiredFields<IPlanet, RF>>({
        endpoint: `planets/${activePlanet!.id}/`,
        body: {
            fields: ['description', 'color', "rating", "plots_count", "type", "diameter"]
        }
    })

    useEffect(() => {
        if (planet) {
            dispatch(planetStateSlice.actions.setActivePlanet(planet))
            dispatch(planetStateSlice.actions.setPlanets(planet))
        }
    }, [planet]);

    const gridMaterialRef = useRef<MeshPhongMaterialParameters>()

    useEffect(() => {
        if (gridMaterialRef.current) {
            gsap.to(gridMaterialRef.current!, {
                duration: 10,
                opacity: 1,
                yoyo: true,
                yoyoEase: "circ",
                repeat: -1,
            })
        }
    }, [gridMaterialRef.current]);

    const settings = useMemo(() => {
        planetInfoSettings.planetProperties.slices.grid!.material!.ref = gridMaterialRef

        return planetInfoSettings
    }, []);

    const infoList = [
        {key: 'diameter', label: 'Диаметр', body: `км`, text: activePlanet?.diameter},
        {key: 'type', label: 'Тип', body: ``, text: activePlanet?.type},
        {key: 'plots_count', label: 'Число участков', body: ``, text: activePlanet?.plots_count},
        {key: 'rating', label: 'Рейтинг', body: `☆`, text: activePlanet?.rating},
    ]

    return (
        <div className="store-panels-info-planet"
             style={activePlanet?.color && {background: getAnyColor(activePlanet.color)}}
        >
            <div className={'title'}>
                <div className={'info'}>
                    <h3>{activePlanet?.name}</h3>
                    {activePlanet && infoList.map(o => o.key).every(key => key in activePlanet) &&
                        <div className={'list'}>
                            {infoList.map(item =>
                                <label key={item.key}>{item.label}: <span>{item.text}</span>{item.body}</label>
                            )}
                        </div>
                    }
                </div>
                {activePlanet && <PlanetScene planet={activePlanet} {...settings}/>}
            </div>
            <div className={'body'}>
                {activePlanet?.description &&
                    <div className={'description'}>
                        <img src={ASSETS_URL + "/images/arrow.svg"} onClick={e => setVisible(!visible)}/>
                        {activePlanet &&
                            <AnimationByCss in={visible} timeout={"--animation-info-planet"}
                                            mountOnEnter unmountOnExit classNames="animation-info-planet">
                                <AnimationTextPrinting text={activePlanet.description} delay={120}
                                                       rangeCutString={[1, 4]}/>
                            </AnimationByCss>}
                    </div>
                }
            </div>
        </div>
    );
};

export default PlanetInfo;