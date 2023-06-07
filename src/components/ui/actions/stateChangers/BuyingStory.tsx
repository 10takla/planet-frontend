import React, {FC} from 'react';
import {convertBuying} from "../../../../helpers/modals/convertBuying";
import UserFocus from "../../userViews/UserFocus";
import {ASSETS_URL} from "../../../../config";
import Currency from "../../info/plot/Currency";
import {useAppDispatch} from "../../../../hooks/redux";
import {IBuying} from "../../../../types/entities/buyingType";

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
                        <div className={'user-block'}>
                            {/*{item.owner && <UserFocus {...item.owner}/>}*/}
                        </div>
                        <div className={'direction'}>
                            <img src={ASSETS_URL + "/images/long-arrow.svg"}/>
                        </div>
                        <div className={'user-block'}>
                            {item.buyer && <UserFocus user={item.buyer}/>}
                        </div>
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