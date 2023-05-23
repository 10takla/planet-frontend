import React, {FC} from 'react';
import {IBuying} from "../../../../../../types/store/threejs/planetObjectsTypes";
import {convertBuying} from "../../../../../../helpers/modals/convertBuying";
import UserFirstView from "../../../../../ui/userViews/UserFirstView";
import {ASSETS_URL} from "../../../../../../config";
import Currency from "../../../../../ui/base/sales/Currency";
import {useAppDispatch} from "../../../../../../hooks/redux";

interface IBuyingStory {
    buying: IBuying[]
}

const BuyingStory: FC<IBuyingStory> = ({buying}) => {
    const dispatch = useAppDispatch()

    return (
        <div className={'list'}>
            {buying.map(item =>
                <div key={item.id} className={'item'}>
                    <div className={'view'}>
                        <div className={'user-block'}>{item.owner && <UserFirstView dispatch={dispatch} {...item.owner}/>}</div>
                        <div className={'direction'}>
                            <img src={ASSETS_URL + "/images/long-arrow.svg"}/>
                        </div>
                        <div className={'user-block'}>{item.buyer && <UserFirstView dispatch={dispatch} {...item.buyer}/>}</div>
                    </div>
                    <div className={'info'}>
                        <label>Цена: <Currency amount={item.cost}/></label>
                        <label>Дата: {convertBuying(item.date)}</label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyingStory;