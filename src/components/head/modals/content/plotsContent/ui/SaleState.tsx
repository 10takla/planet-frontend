import React, {FC, useCallback, useState} from 'react';
import {requestURL} from "../../../../../../helpers/requestApi";
import Waiting from "../../../../../ui/base/Waiting/Waiting";
import {fetchUpdate} from "../../../../../../reducers/ActionCreator";

interface ISaleState {
    isSale: boolean
    plotId: number
}

const SaleState: FC<ISaleState> = ({isSale, plotId}) => {
    const [sale, setSale] = useState(isSale);
    const [isWaiting, setIsWaiting] = useState(false);

    const handleOnClick = useCallback((plotId: number, isSale: boolean) => {
        setIsWaiting(true)
        fetchUpdate(plotId, {
            isSale: isSale
        })
            .then((data: any) => {
                setSale(data.isSale)
                setIsWaiting(false)
            })
            .catch(error => {
                setIsWaiting(false)
            })
    }, []);

    return (
        <div className={'sale-state'}>
            {sale ? 'Продается' : 'Выставить на продажу'}
            <div className={['indicator', sale ? 'active' : ''].join(' ')}
                 onClick={() => handleOnClick(plotId, !sale)}>
                <Waiting isWaiting={isWaiting}/>
            </div>
        </div>
    );
};

export default SaleState;