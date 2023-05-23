import React, {FC, MouseEvent, useCallback, useState} from 'react';
import {IBasket, IPlot} from "../../../../../types/store/threejs/planetObjectsTypes";
import {requestURL} from "../../../../../helpers/requestApi";
import {getCookie} from "../../../../../helpers/cookieApi";
import HoverDescription from "../../../info/HoverDescription/HoverDescription";
import Waiting from "../../../base/Waiting/Waiting";
import "./basket.scss"


interface IBasketComponent {
    basket: IBasket
    plotId: IPlot['id']
}

const Basket: FC<IBasketComponent> = ({basket, plotId}) => {
    const [basketTmp, setBasketTmp] = useState(basket);
    const [isActive, setIsActive] = useState(!!basket);
    const [isWaiting, setIsWaiting] = useState(false);

    const setInBasket = useCallback((event: MouseEvent<HTMLImageElement>) => {
        setIsWaiting(true)
        console.log(isWaiting)
        if (isActive) {
            fetch(requestURL(`goods/basket/${basketTmp.id}/delete/`), {
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${getCookie('token')}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response;
                })
                .then((data) => {
                    setIsActive(false)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => setIsWaiting(false))
        } else {
            fetch(requestURL(`goods/basket/create/`), {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": `Token ${getCookie('token')}`,
                },
                body: JSON.stringify(
                    {
                        plot: plotId,
                    }
                )
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data: IBasket) => {
                    setBasketTmp(data)
                    setIsActive(true)
                })
                .catch(error => {

                })
                .finally(() => setIsWaiting(false))
        }
    }, [isActive]);

    return (
        <HoverDescription className={['basket', isActive ? 'active' : ''].join(' ')}
                          description={'Добавить в корзину'}
                          isActive={isActive}
                          oppositeDescription={'Убрать из корзины'}
                          onClick={setInBasket}>
            <img className={isActive ? 'active' : ''} src="/assets/images/bag.svg"/>
            <Waiting isWaiting={isWaiting}/>
        </HoverDescription>
    );
};

export default Basket;