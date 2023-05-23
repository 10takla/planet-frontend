import React, {FC} from 'react';
import {ActionType, IActionElement} from "../../../../../types/store/panels/actionPanelTypes";
import {useAppSelector} from "../../../../../hooks/redux";
import {ASSETS_URL} from "../../../../../config"

interface IActionElementComponent {
    action: IActionElement<ActionType>
    actions?: { [key in any]: boolean | number | object }
    handleOnClick: () => void
}

const ActionElement: FC<IActionElementComponent> = ({action, handleOnClick}) => {
    const actions = useAppSelector(state => state.storeStateReducer.actionPanel[action.type])

    return (
        // @ts-ignore
        <img className={["action-element", 'selectable', actions[action.name] ? 'active' : ''].join(' ')}
             onClick={handleOnClick}
             src={ASSETS_URL + `images/actions/${action.img ?? action.name}.svg`}/>
    )
}

export default ActionElement;