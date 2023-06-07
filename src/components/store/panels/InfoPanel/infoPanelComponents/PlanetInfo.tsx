import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch} from "../../../../../hooks/redux";
import AnimationByCss from "../../../../ui/animations/AnimationByCss";
import {getAnyColor} from "../../../../../helpers/store/threejs";
import {gsap} from "gsap";
import {MeshPhongMaterialParameters} from "three";
import AnimationTextPrinting from "../../../../ui/animations/AnimationTextPrinting";
import {ASSETS_URL} from "../../../../../config";
import {RequiredFields} from "../../../../../types/functionsTS";
import {IPlanet} from "../../../../../types/entities/planetType";
import {usePlanet} from "../../../../../hooks/useDataById";
import PlanetScene from "../../../../ui/threejs/PlanetScene";

const PlanetInfo = () => {
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(true);
    type RF = 'description' | 'color' | 'rating' | 'plots_count' | 'type' | 'diameter'
    const planet = usePlanet<RequiredFields<IPlanet, RF>>()

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

    const infoList = [
        {key: 'diameter', label: 'Диаметр', body: `км`, text: planet?.diameter},
        {key: 'type', label: 'Тип', body: ``, text: planet?.type},
        {key: 'plots_count', label: 'Число участков', body: ``, text: planet?.plots_count},
        {key: 'rating', label: 'Рейтинг', body: `☆`, text: planet?.rating},
    ]

    return (
        <div className="store-panels-info-planet"

        >
            <div className={'title'} style={planet?.color && {background: getAnyColor(planet.color, 1, 50)}}>
                <h3>{planet?.name}</h3>
            </div>
            <div className={'body'}>
                <div className={'info'}>
                    {planet && infoList.map(o => o.key).every(key => key in planet) &&
                        <div className={'list'}>
                            {infoList.map(item =>
                                <label key={item.key}>{item.label}: <span>{item.text}</span>{item.body}</label>
                            )}
                        </div>
                    }
                    {planet && <PlanetScene slice={'planetInfo'} planet={planet}/>}
                </div>

                    {planet &&
                        <div className={'description'}>
                            <img src={ASSETS_URL + "/images/arrow.svg"} onClick={e => setVisible(!visible)}/>
                            {planet &&
                                <AnimationByCss in={visible} timeout={"--animation-info-planet"}
                                                mountOnEnter unmountOnExit classNames="animation-info-planet">
                                    <AnimationTextPrinting text={planet.description} delay={120}
                                                           rangeCutString={[1, 4]}/>
                                </AnimationByCss>}
                        </div>
                    }

            </div>
        </div>
    );
};

export default PlanetInfo;