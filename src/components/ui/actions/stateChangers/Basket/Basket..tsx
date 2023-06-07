import React, {FC, HTMLProps, MouseEvent, useCallback, useEffect} from 'react';
import HoverDescription from "../../../info/HoverDescription/HoverDescription";
import Waiting from "../../../base/Waiting/Waiting";
import "./basket.scss"
import {IPlot} from "../../../../../types/entities/plotType";
import {IBasket} from "../../../../../types/entities/basketType";
import {useFetchCRUDE} from "../../../../../hooks/useFetch";
import {useAppDispatch} from "../../../../../hooks/redux";
import {planetStateSlice} from "../../../../../reducers/slices/scene/PlanetStateSlice";
import {messagesStateSlice} from "../../../../../reducers/slices/app/MessagesStateSlice";
import ErrorCommands from "../../../../commands/ErrorComands/ErrorCommands";


interface IBasketComponent extends HTMLProps<HTMLElement>{
    basket: IBasket | null
    plotId: IPlot['id']
}

const Basket: FC<IBasketComponent> = ({basket, plotId, ...props}) => {
    const dispatch = useAppDispatch()
    const [updated, makeUpdate, isWaiting, error] = useFetchCRUDE<IBasket>(basket, [])

    useEffect(() => {
        if (updated) {
            dispatch(planetStateSlice.actions.changePlot(
                {
                    plotId: plotId, change: {basket: updated}
                }))
        }
    }, [updated]);

    const onHoverDescriptionClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        makeUpdate({
            endpoint: 'basket/' + (updated ? `${updated.id}/` : '') as `${string}/` ,
            body: {
                plot: plotId
            },
            action: updated ? 'delete' : 'create'
        })
    }, [plotId, updated]);

    useEffect(() => {
        if (error){
            dispatch(messagesStateSlice.actions.setLogs([{
                text: (
                    <>
                        Вы не авторизованы. <ErrorCommands statusCode={Number(error)}/>
                    </>
                ),
                date: new Date().toLocaleDateString(),
                isNotice: true,
                // lifetime: 50000
            }]))
        }
    }, [error]);

    return (
        <HoverDescription className={['basket', updated ? 'active' : '', props.className].join(' ')}
                          description={'Добавить в корзину'}
                          isActive={!!updated}
                          oppositeDescription={'Убрать из корзины'}
                          onClick={onHoverDescriptionClick}
        >
            <img className={updated ? 'active' : ''} src="/assets/images/basket.svg"/>
            <Waiting isWaiting={isWaiting}/>
        </HoverDescription>
    );
};

export default Basket;