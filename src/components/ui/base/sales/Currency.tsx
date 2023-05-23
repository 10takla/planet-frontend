import React, {FC} from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {ASSETS_URL} from "../../../../config";

interface ICurrency {
    amount: number
}

const Currency: FC<ICurrency> = ({amount}) => {
    const {currency} = useAppSelector(state => state.appStateReducer)

    return (
        <div className='currency' style={{display: "flex", alignItems: "center"}}>
            {amount.toLocaleString()}
            <img src={ASSETS_URL + `/images/currency/${currency}.svg`}
                 style={{paddingTop: '0.3em', width: '1.3em'}}/>
        </div>
    );
};

export default Currency;