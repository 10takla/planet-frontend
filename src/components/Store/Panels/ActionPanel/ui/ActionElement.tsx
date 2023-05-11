import React, {FC, MouseEvent, useCallback} from 'react';
import {
    ActionButtonType,
    ActionKeysType,
    ActionType, ChangeActionType,
    IActionElement
} from "../../../../../types/store/panels/actionPanelTypes";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import {storeStateSlice} from "../../../../../reducers/slices/StoreStateSlice";

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
             src={`/assets/images/actions/${action.img ?? action.name}.svg`}/>
    )
}

export default ActionElement;