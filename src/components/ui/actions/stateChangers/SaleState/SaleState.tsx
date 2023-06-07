import React, {FC, MouseEvent, useCallback, useEffect, useState} from 'react';
import Waiting from "../../../base/Waiting/Waiting";
import './saleState.scss'
import {planetStateSlice} from "../../../../../reducers/slices/scene/PlanetStateSlice";
import {useAppDispatch} from "../../../../../hooks/redux";
import {useFetchCRUDE} from "../../../../../hooks/useFetch";

interface ISaleState {
    isSale: boolean
    plotId: number
}

const SaleState: FC<ISaleState> = ({isSale, plotId}) => {
    const dispatch = useAppDispatch()
    const [tmp, setTmp] = useState(isSale);
    const [sale, makeUpdate, isWaiting] = useFetchCRUDE<any>(isSale)

    useEffect(() => {
        console.log(sale.isSale)
        setTmp(sale.isSale)

        dispatch(planetStateSlice.actions.changePlot({plotId: plotId, change: sale}))
    }, [sale]);

    const onDivClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        makeUpdate({
            endpoint: `planets/plots/${plotId}/`,
            body: {
                isSale: !tmp
            },
            action: 'update'
        })
    }, [tmp, plotId]);

    return (
        <div className={'sale-state'}>
            {tmp ? 'Продается' : 'Выставить на продажу'}
            <div className={['indicator', tmp ? 'active' : ''].join(' ')}
                 onClick={onDivClick}
            >
                <Waiting isWaiting={isWaiting}/>
            </div>
        </div>
    );
};

export default SaleState;