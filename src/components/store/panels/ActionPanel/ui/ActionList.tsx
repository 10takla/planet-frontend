import React, {FC, useCallback} from 'react';
import {DirectionType, ListType, SideType} from "../../../../../types/store/panels/actionPanelTypes";
import ActionButton from "./ActionButton";
import ActionRange from "./ActionRange";
import ActionSelector from "./ActionSelectore";
import {
    IModernButtonAction,
    IModernCombineActions,
    IModernRangeAction,
    IModernSelectorAction
} from "../../../../../types/store/scene/actionsTypes";

interface IActionList {
    direction: DirectionType
    layer?: number
    list: IModernCombineActions[]
    isChangeDirection?: boolean
    rootRef?: React.MutableRefObject<HTMLDivElement | null>
}

const ActionList: FC<IActionList> = ({direction, layer = 0, isChangeDirection = false, list, rootRef}) => {
    const reverseList  = useCallback((list: any[]) => {
        return direction.includes("left") ? list : [...list].reverse()
    }, []);

    const getAnyTypeList = useCallback((typeList: string): ListType => {
        if (typeList === "column") return "row"
        else return "column"
    }, []);

    const getAnySide = useCallback((typeList: string): SideType => {
        if (typeList === "left") return "right"
        else return "left"
    }, []);

    const getDirection = useCallback((index: number): DirectionType => {
        const [typeList, side] = direction.split(' ')
        const data = `${getAnyTypeList(typeList)} ${list.length - 1 === index ? side : getAnySide(side)}`
        return data as DirectionType
    }, []);

    return (
        <div className={[`action-list`, direction].join(' ')}>
            {list.map((action, i) =>
                <div className='action' key={i}>
                    {"actions" in action && action.actions &&
                        <ActionList rootRef={rootRef} layer={layer + 1} list={reverseList(action.actions!)}
                                    direction={getDirection(i)}/>}
                    {
                        action.type === "button" &&
                        <ActionButton actionB={action as IModernButtonAction}
                                      rootRef={rootRef}/>
                    }
                    {
                        action.type === "range" &&
                        <ActionRange rootRef={rootRef}
                                     actionR={action as IModernRangeAction} direction={direction}/>
                    }
                    {
                        action.type === "selector" &&
                        <ActionSelector rootRef={rootRef}
                                        actionS={action as IModernSelectorAction} direction={direction}/>
                    }
                </div>
            )}
        </div>
    );
};

export default ActionList;