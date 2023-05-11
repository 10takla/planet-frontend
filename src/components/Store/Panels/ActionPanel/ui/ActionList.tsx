import React, {FC} from 'react';
import {
    ActionType,
    DirectionType,
    IActionElement,
    ListType,
    SideType
} from "../../../../../types/store/panels/actionPanelTypes";
import ActionButton from "./ActionButton";
import ActionRange from "./ActionRange";
import ActionSelector from "./ActionSelectore";

interface IActionList {
    direction: DirectionType
    layer?: number
    list: IActionElement<ActionType>[]
    isChangeDirection?: boolean
}


const ActionList: FC<IActionList> = ({direction, layer = 0, isChangeDirection = false, list}) => {
    const reverseList = (list: IActionElement<ActionType>[]) => {
        return direction.includes("left") ?   list:list.reverse()
    }

    const getAnyTypeList = (typeList: string): ListType => {
        if (typeList === "column") return "row"
        else return "column"
    }

    const getAnySide = (typeList: string): SideType => {
        if (typeList === "left") return "right"
        else return "left"
    }

    const getDirection = (index: number): DirectionType => {
        const [typeList, side] = direction.split(' ')
        const data = `${getAnyTypeList(typeList)} ${list.length - 1 === index ? side : getAnySide(side)}`

        return data as DirectionType
    }

    return (
        <div className={[`action-list`, direction].join(' ')}>
            {list.map((action, i) =>
                <div className='action' key={i}>
                    {action.list && <ActionList layer={layer + 1} list={reverseList(action.list!)}
                                                direction={getDirection(i)}/>}
                    {
                        action.type === "buttons" && // @ts-ignore
                        <ActionButton className={'action-element'} action={action}/>
                    }
                    {
                        action.type === "ranges" &&  // @ts-ignore
                        <ActionRange className={'action-element'} action={action} direction={direction}/>
                    }
                    {
                        action.type === "selectors" && // @ts-ignore
                        <ActionSelector className={'action-element'} action={action} direction={direction}/>
                    }
                    <div className={[`action-description`, direction].join(' ')}>
                        {action.description}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionList;