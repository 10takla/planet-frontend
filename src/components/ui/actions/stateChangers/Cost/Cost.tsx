import React, {FC, KeyboardEvent, useCallback, useEffect, useMemo, useState} from 'react';
import Waiting from "../../../base/Waiting/Waiting";
import Currency from "../../../info/plot/Currency";
import {IPlot} from "../../../../../types/entities/plotType";
import {RequiredFields} from "../../../../../types/functionsTS";
import './cost.scss'
import Label from "../../../base/Label";
import {useFetchCRUDE} from "../../../../../hooks/useFetch";
import {planetStateSlice} from "../../../../../reducers/slices/scene/PlanetStateSlice";
import {useAppDispatch} from "../../../../../hooks/redux";

interface IChangeCost extends RequiredFields<IPlot, 'price' | 'markUp'> {
}

const Cost: FC<IChangeCost> = ({id, price, markUp, ...props}) => {
    const [value, setValue] = useState(markUp);
    const dispatch = useAppDispatch()
    useEffect(() => {
        setValue(markUp)
    }, [markUp]);

    const [updated, makeUpdate, isWaiting] = useFetchCRUDE({markUp: markUp})

    useEffect(() => {
        if (updated) {
            dispatch(planetStateSlice.actions.changePlot({plotId: id, change: updated}))
        }
    }, [updated]);

    const fetch = useCallback((e: any) => {
        makeUpdate({
            endpoint: `planets/plots/${id}/`,
            body: {
                markUp: parseInt(e.target.value)
            },
            action: 'update'
        })
    }, []);

    const handelInputOnBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        fetch(e)
    }, []);
    const onInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && fetch(e)
    }, []);

    const cost = useMemo(() => {
        return value + price
    }, [value, id]);

    const maxMarkUp = useMemo(() => {
        return price * 15 / 100
    }, [price]);
    return (
        <div className={'cost'}>
            <Label className={'start-cost'}>Стоимость: <Currency amount={price}/></Label>
            <Label className={'markUp'}>
                <Waiting isWaiting={isWaiting}/>
                Наценка:
                <input  onKeyDown={onInputKeyDown} onBlur={handelInputOnBlur}
                       onChange={e => setValue(parseInt(e.target.value))}
                       type="number" placeholder={'Наценка'} value={value}/>
            </Label>
            <Label className={'max-markUp'}>Максимальная наценка: 15% / {<Currency amount={maxMarkUp}/>}</Label>
            <Label className={'final-cost'}>Конченая стоимость: <Currency amount={cost}/></Label>
        </div>
    );
};

export default Cost;