import React, {FC} from 'react';
import {DirectionType} from "../../../../types/store/panels/actionPanelTypes";
import ActionList from "./ui/ActionList";
import {IModernCombineActions} from "../../../../types/store/scene/actionsTypes";


interface IActionPanelComponent {
    className: "top" | "bottom"
    direction: DirectionType
    list: IModernCombineActions[]
    rootRef: React.MutableRefObject<HTMLDivElement | null>
}

const ActionPanel: FC<IActionPanelComponent> = ({list, direction, className, rootRef,}) => {

    return (
        <div className={"store-panels-actions " + className}>
            <ActionList list={list} direction={direction} rootRef={rootRef}/>
        </div>
    );
};


export default ActionPanel;