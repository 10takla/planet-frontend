import React, {FC} from 'react';
import {ActionType, DirectionType, IActionElement} from "../../../../types/store/panels/actionPanelTypes";
import ActionList from "./ui/ActionList";


interface IActionPanelComponent {
    className: "top" | "bottom"
    direction: DirectionType
    list: IActionElement<ActionType>[]
}

const ActionPanel: FC<IActionPanelComponent> = ({list, direction, className,}) => {

    return (
        <div className={"store-panels-actions " + className}>
            <ActionList list={list} direction={direction}/>
        </div>
    );
};


export default ActionPanel;