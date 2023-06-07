import React, {FC, HTMLProps, MouseEvent, useCallback, useEffect, useState} from 'react';
import {IPlot} from "../../../../../types/entities/plotType";
import Waiting from "../../../base/Waiting/Waiting";
import {useAppDispatch} from "../../../../../hooks/redux";
import {planetStateSlice} from "../../../../../reducers/slices/scene/PlanetStateSlice";
import {IBuying} from "../../../../../types/entities/buyingType";
import {useFetchCRUDE} from "../../../../../hooks/useFetch";
import HoverDescription from "../../../info/HoverDescription/HoverDescription";
import ConfirmModals from "../../../modals/ConfirmModal/СonfirmModal";
import './buying.scss'
import {messagesStateSlice} from "../../../../../reducers/slices/app/MessagesStateSlice";
import ErrorCommands from "../../../../commands/ErrorComands/ErrorCommands";

interface IBuyingComponent extends HTMLProps<HTMLElement>{
    plotId: IPlot['id']
}

const Buying: FC<IBuyingComponent> = ({plotId, ...props}) => {
    const dispatch = useAppDispatch()
    const [created, fetchBuyPlot, isWaiting, error] = useFetchCRUDE<IBuying>(null)

    useEffect(() => {
        if (created) {
            dispatch(planetStateSlice.actions.changePlot({plotId: plotId, change: {owner: created.buyer}}))
        }
    }, [created]);

    const performFunc = useCallback(() => {
        fetchBuyPlot({
                endpoint: 'buying/',
                body: {
                    plot: plotId
                },
                action: 'create'
            }
        )
    }, []);

    const [confirm, setConfirm] = useState(false);
    const onButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setConfirm(true)
    }, []);

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
        <ConfirmModals setConfirm={setConfirm} confirm={confirm} message={'Подтвердить покупку участка?'} performFunction={performFunc}>
            <HoverDescription className={[props.className, 'buying'].join(' ')}
                              description={'Приобрести участок'}>
                <button onClick={onButtonClick}>Купить
                    {isWaiting && <Waiting isWaiting={isWaiting}/>}
                </button>
            </HoverDescription>
        </ConfirmModals>
    );
};

export default Buying;