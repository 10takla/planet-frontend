import React, {FC, useCallback, useEffect, useState} from 'react';
import {ActionSelectorType, DirectionType, IActionElement} from "../../../../../types/store/panels/actionPanelTypes";
import {useAppDispatch} from "../../../../../hooks/redux";
import {storeStateSlice} from "../../../../../reducers/slices/StoreStateSlice";
import Select from "../../../../ui/base/Select";

interface IActionSelector extends HTMLDivElement {
    action: IActionElement<"selectors">
    direction: DirectionType
}

const ActionSelector: FC<IActionSelector> = ({direction, className, action}) => {
    const dispatch = useAppDispatch()

    const handleOnSelect = useCallback((selectedValue: ActionSelectorType[keyof ActionSelectorType]) => {
        dispatch(storeStateSlice.actions.setActionPanel({[action.name]: selectedValue}))
    }, [])

    return (
        <Select direction={direction} className={[className, 'selectable'].join(' ')}
                items={action.body!}
                handleOnSelect={handleOnSelect}/>
    )
}

export default ActionSelector;