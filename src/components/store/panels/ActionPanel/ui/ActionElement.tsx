import React, {FC, HTMLProps} from 'react';
import {useAppSelector} from "../../../../../hooks/redux";
import {ASSETS_URL} from "../../../../../config"
import {IModernActionElement} from "../../../../../types/store/scene/actionsTypes";
import HoverDescription from "../../../../ui/info/HoverDescription/HoverDescription";

interface IActionElementComponent extends HTMLProps<any>{
    actionE: IModernActionElement
    actions?: { [key in any]: boolean | number | object }
    handleOnClick: () => void
    rootRef?: React.MutableRefObject<HTMLDivElement | null>
}

const ActionElement: FC<IActionElementComponent> = ({actionE, handleOnClick, ...props}) => {
    const actionValue = useAppSelector(state => state.planetSceneReducer.store.actions[actionE.root][actionE.name])

    return (
        <HoverDescription description={actionE.description} {...props}>
            <img className={["action-element", 'selectable', actionValue ? 'active' : ''].join(' ')}
                 onClick={handleOnClick}
                 src={ASSETS_URL + `images/actions/${actionE.img}.svg`}/>
        </HoverDescription>
    )
}

export default ActionElement;