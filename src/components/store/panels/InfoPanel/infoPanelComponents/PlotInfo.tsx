import React, {useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import {requestURL} from "../../../../../helpers/requestApi";
import {ASSETS_URL} from "../../../../../config";
import {IPlot} from "../../../../../types/store/threejs/planetObjectsTypes";
import UserFirstView from "../../../../ui/userViews/UserFirstView";
import {usePlanet, usePlot} from "../../../../../hooks/useDataById";
import Label from "../../../../ui/base/Label";

const PlotInfo = () => {
    const activePlot = usePlot()
    const activePlanet = usePlanet()

    const tmp = activePlot?.area! * activePlanet?.diameter!

    const infoList = useMemo(() => {

        const gg = [
            {name: 'cost', }
        ]

        const data = [
            {name: 'price', label: 'Стоимость', prefix: '$', func: (o: number) => o.toLocaleString()},
            {name: 'area', label: 'Площадь', prefix: 'км2', func: (o: number) => tmp.toFixed(2)}
        ]
        return data.map(item => (
            {
                label: item.label,
                // @ts-ignore
                text: (item.func ? item.func(activePlot[item.name]) : activePlot![item.name]) + item.prefix,
            }
        ))
    }, []);


    return (
        <div className='plots-product-card' style={{background: activePlot?.color}}>
            <div className="title">
                {activePlot?.name}
                {/*<PlanetScene/>*/}
            </div>
            <div className="body">
                <div className={'top-side-bar'}>
                    <div className='owner'>
                        {activePlot?.user ?
                            <label>Владелец:
                                {/*<UserFirstView dispatch={dispatch} {...activePlot.user}/>*/}
                            </label> :
                            <div>нет владельца</div>
                        }
                    </div>
                </div>
                <div className={'content'}>
                    {infoList.map(item =>
                        <Label>{item.label}: {item.text}</Label>
                    )}
                </div>
            </div>
            <div className="actions">
                <img src={ASSETS_URL + "/images/users/like.svg"}/>
                <button>{activePlot?.user ? 'Переекупить' : 'Купить'}</button>
            </div>
        </div>
    );
};

export default PlotInfo;