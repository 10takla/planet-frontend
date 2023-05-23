import React, {FC, HTMLProps, useCallback, useEffect, useState} from 'react';
import {ActionButtonType, ActionType, IActionElement} from "../../../../../types/store/panels/actionPanelTypes";
import ActionElement from "./ActionElement";
import ActionPanel from "../ActionPanel";
import {storeStateSlice} from "../../../../../reducers/slices/StoreStateSlice";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";

interface IActionButton extends HTMLDivElement {
    action: IActionElement<"buttons">
}

const ActionButton: FC<IActionButton> = ({className, action}) => {
    const dispatch = useAppDispatch()
    const handleOnClick = useCallback(() => {
        dispatch(storeStateSlice.actions.setActionPanel(action.name))
    }, []);

    return (
        <div className={[className, "action-button"].join(' ')}>
            <ActionElement action={action} handleOnClick={handleOnClick}/>
        </div>
    );
};

export default ActionButton;