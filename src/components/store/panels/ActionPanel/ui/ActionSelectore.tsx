import React, {FC, HTMLProps, useCallback} from 'react';
import {DirectionType,} from "../../../../../types/store/panels/actionPanelTypes";
import {useAppDispatch} from "../../../../../hooks/redux";
import Select from "../../../../ui/base/Select/Select";
import {IModernSelectorAction, SelectorsType} from "../../../../../types/store/scene/actionsTypes";
import {planetSceneSlice} from "../../../../../reducers/slices/scene/planetSceneSlice";
import HoverDescription from "../../../../ui/info/HoverDescription/HoverDescription";

interface IActionSelector extends HTMLProps<HTMLDivElement> {
    actionS: IModernSelectorAction
    direction: DirectionType
    rootRef?: React.MutableRefObject<HTMLDivElement | null>
}

const ActionSelector: FC<IActionSelector> = ({direction, rootRef, className, actionS}) => {
    const dispatch = useAppDispatch()

    const handleOnSelect = useCallback((selectedValue: SelectorsType[keyof SelectorsType]) => {
        dispatch(planetSceneSlice.actions.setAction({data: [actionS.root, {[actionS.name]: selectedValue}], slice: 'store'}))
    }, [])

    return (
        <div className={['action-selector', className, 'selectable'].join(' ')}>
            <HoverDescription rootRef={rootRef} description={actionS.description}>
                <Select direction={direction} className={'action-element'}
                        items={actionS.options!}
                        handleOnSelect={handleOnSelect}/>
            </HoverDescription>
        </div>

    )
}

export default ActionSelector;