import React, {FC, useMemo} from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {ASSETS_URL} from "../../../../config";
import {convertNumToUnit} from "../../../../helpers/convertations/numbers";
import {CurrencyType} from "../../../../types/app/appTypes";

interface ICurrency {
    amount: number,
    currency?: CurrencyType
}

const Currency: FC<ICurrency> = ({amount, ...props}) => {
    const {currency} = useAppSelector(state => state.appStateReducer)

    const getCurrency = useMemo(()=> {
        return props.currency ?? currency
    }, [currency, props.currency])

    return (
        <div className='currency' style={{display: "flex", alignItems: "flex-end", columnGap: '0.2em'}}>
            {convertNumToUnit(amount, 1).toLocaleString()}
            <img src={ASSETS_URL + `/images/currency/${getCurrency}.svg`}
                 style={{paddingTop: '0.3em', width: '1.3em'}}/>
        </div>
    );
};

export default Currency;