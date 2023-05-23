import React, {FC, useCallback, useMemo, useState} from 'react';
import Waiting from "../../../../../ui/base/Waiting/Waiting";
import {fetchUpdate} from "../../../../../../reducers/ActionCreator";
import {convertBuying} from "../../../../../../helpers/modals/convertBuying";
import {useAppSelector} from "../../../../../../hooks/redux";
import Currency from "../../../../../ui/base/sales/Currency";

interface IChangeCost {
    price: number
    mark: number
    plotID: number
}

const Cost: FC<IChangeCost> = ({plotID, price, mark}) => {
    const [value, setValue] = useState(mark);


    const [isWaiting, setIsWaiting] = useState(false);

    const handelInputOnBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        setIsWaiting(true)
        fetchUpdate(plotID, {markUp: parseInt(e.target.value)})
            .then((data: any) => {
                setValue(data.markUp)
                setIsWaiting(false)
            })
            .catch(error => {
                setValue(mark)
                setIsWaiting(false)
            })
    }, []);

    const cost = useMemo(() => {
        return value + price
    }, [value]);

    return (
        <div className={'cost'}>
            <label>Стоимость: <Currency amount={price}/></label>
            <label>
                <Waiting isWaiting={isWaiting}/>
                Наценка: <div>
                <input onBlur={handelInputOnBlur} onChange={e => setValue(parseInt(e.target.value))}
                       type="number" placeholder={'Наценка'} value={value}/>
            </div>
            </label>
            <label>Конченая стоимость: <Currency amount={cost}/></label>
        </div>
    );
};

export default Cost;