import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {ASSETS_URL} from "../../../../config";
import {FieldsFocusViewUserType, IFocusViewUser, IUser} from "../../../../types/user/userTypes";
import Currency from "../../../ui/base/sales/Currency";
import {useFetch} from "../../../../hooks/useFetch";
import {IPlot} from "../../../../types/store/threejs/planetObjectsTypes";
import {RequiredFields} from "../../../../types/functionsTS";
import Basket from "../../../ui/actions/stateChangers/Basket/Basket.";
import Label from "../../../ui/base/Label";
import OpenInStore from "../../../ui/actions/OpenInStore";
import {IFetch} from "../../../../types/fetch/fetchTypes";
import FetchList from "../../../ui/base/scrollList/FetchList/FetchList";


const UserModal = ({}) => {
    const {focusUserId} = useAppSelector(state => state.userDataReducer)
    const [user, isWaitingUser] = useFetch<IUser, IFocusViewUser>(
        {endpoint: `user/${focusUserId}/`}, [focusUserId]
    )

    type RF = RequiredFields<IPlot, 'cost' | 'planet' | 'basket'>
    const [allPlots, setAllPlots] = useState<RF[]>([]);

    const body: IFetch<IPlot> = {
        endpoint: `user/${focusUserId}/planets/plots/`,
        isToken: true,
        body: {
            fields: ['cost', 'basket', 'planet'],
        }
    }

    return (
        <div className={'modal-content-users'}>
            <div className={'plots'}>
                <h3>В продаже</h3>
                {<FetchList size={8} returnList={setAllPlots} {...body}>
                    {allPlots.map(plot =>
                        <div className={'item'} key={plot.id}>
                            <div className={'info'}>
                                <h4>{plot.name}</h4>
                                <Label>Цена: <Currency amount={plot.cost}/></Label>
                                <Label>Планета: {plot.planet?.name}</Label>
                            </div>
                            <div className={'actions'}>
                                <Basket plotId={plot.id} basket={plot.basket}/>
                                <OpenInStore plot={plot}/>
                            </div>
                        </div>
                    )}
                </FetchList>}
            </div>
            {user && <div className={'profile'}>
                <div className={'top-side'}>
                    <div className={'info'}>
                        <label className={'plots'}>Учатсков: {user.plotsCount}</label>
                        <label className={'rank'}>Метсо в рейтинге: {user.rank}</label>
                        {/*<label className={'capital'}>Капитал учатсков: {<Currency amount={userViews.plotCapital}/>}</label>*/}
                    </div>
                    <div className={'face'}>
                        <div className={'avatar'} style={{background: user.color}}>
                            <img src={user.logo}/>
                        </div>
                        <span className={'name'}>{user.username}</span>
                    </div>
                </div>
                {user.status && <label className={'status'}>
                    Статус: <span>{user.status}</span>
                </label>}
                {user.telegramName && <label className={'contact'}>
                    Связаться:
                    <a href={'https://t.me/' + user.telegramName} target={'_blank'}>
                        <img src={ASSETS_URL + 'images/platforms/telegram.svg'}/>
                    </a>
                </label>}
            </div>}

        </div>
    );
};

export default UserModal;