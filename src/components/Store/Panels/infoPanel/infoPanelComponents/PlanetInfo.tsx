import React, {useEffect, useMemo, useRef, useState} from 'react';
import {fetchPlanetsData} from "../../../../../reducers/ActionCreator";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import AnimationByCss from "../../../../UI/Animation/AnimationByCss";
import {planetStateSlice} from "../../../../../reducers/slices/PlanetStateSlice";
import {getAnyColor} from "../../../../../helpers/store/threejs";
import PlanetScene from "../../../../UI/Threejs/PlanetScene";
import {planetInfoSettings} from "../../../../../configs/scene/p;anetInfo";
import {storeSettings} from "../../../../../configs/scene/sceneSettings";
import {gsap} from "gsap";
import {MeshPhongMaterialParameters, MeshStandardMaterial, MeshStandardMaterialParameters} from "three";
import {MeshPhongMaterialProps} from "@react-three/fiber";
import AnimationTextPrinting from "../../../../UI/Animation/AnimationTextPrinting";
import {IPlanet} from "../../../../../types/store/threejs/planetObjectsTypes";

const PlanetInfo = () => {
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(true);
    const {activePlanet} = useAppSelector(state => state.planetStateReducer)

    useEffect(() => {
        if (activePlanet) {
            const fields = ['description', 'color', "rating", "plots_count", "type", "diameter"]
            const notExist = fields.filter(filed => !activePlanet.hasOwnProperty(filed))
            if (notExist.length) {
                fetchPlanetsData(`planets/${activePlanet.id}/`, false, [["fields", notExist]])
                    .then(planet => {
                        dispatch(planetStateSlice.actions.setActivePlanet(planet))
                        dispatch(planetStateSlice.actions.setPlanets(planet))
                    })
            }
        }
    }, [activePlanet]);

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
                                <label>{item.label}: <span>{item.text}</span>{item.body}</label>
                            )}
                        </div>
                    }
                </div>
                {activePlanet && <PlanetScene planet={activePlanet} {...settings}/>}
            </div>
            <div className={'body'}>
                {activePlanet?.description &&
                    <div className={'description'}>
                        <img src="/assets/images/arrow.svg" onClick={e => setVisible(!visible)}/>
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