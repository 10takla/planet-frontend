import React from 'react';
import {useAppSelector} from "../../../../../hooks/redux";
import {requestURL} from "../../../../../helpers/requestApi";

const PlotInfo = () => {
    const {activePlot} = useAppSelector(state => state.planetStateReducer)

    return (
        <div className='plots-product-card' style={{background: activePlot?.color}}>
            <div className="title">
                {activePlot?.name}
                {/*<PlanetScene/>*/}
            </div>
            <div className="body">
                <div className='owner'>
                    {activePlot?.user ?
                        <label>Владелец:
                            <div className='avatar'>
                                <img src={requestURL(activePlot?.user?.logo!)}/>
                                <p>{activePlot?.user?.username}</p>
                            </div>
                        </label> :
                        <div>нет владельца</div>
                    }
                </div>
                <div className="description">
                    {Array(20).fill('eeasdasd').join('')}
                </div>
                <label>Стоимость: <span>{activePlot?.price && activePlot?.price.toLocaleString()}$</span></label>
            </div>
            <div className="actions">
                <img src="/assets/images/users/like.svg"/>
                <button>{activePlot?.user ? 'Переекупить' : 'Купить'}</button>
            </div>
        </div>
    );
};

export default PlotInfo;