import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import ActionElement from "./ActionElement";
import {DirectionType,} from "../../../../../types/store/panels/actionPanelTypes";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import $ from 'jquery'
import "jquery-ui/dist/jquery-ui";
import 'jquery-ui/themes/base/all.css';
import {IActionForPanel, IModernRangeAction} from "../../../../../types/store/scene/actionsTypes";
import {planetSceneReducer, planetSceneSlice} from "../../../../../reducers/slices/scene/planetSceneSlice";

interface IActionRange extends React.HTMLProps<HTMLDivElement> {
    actionR: IModernRangeAction
    direction: DirectionType
    rootRef?:React.MutableRefObject<HTMLDivElement | null>
}

const ActionRange: FC<IActionRange> = ({direction, rootRef, className, actionR}) => {
    const [typeList, side] = direction.split(' ')
    const dispatch = useAppDispatch()
    const range = useAppSelector(state => state.planetSceneReducer.store.actions[actionR.root][actionR.name])

    useEffect(() => {
        $(`.action-range-slider.${typeList}#${actionR.name}`).slider({
            range: "min",
            min: actionR.range![0],
            max: actionR.range![1],
            step: (actionR.range![1] - actionR.range![0]) / 100,
            value: range,
            orientation: typeList === "row" ? "vertical" : "horizontal",
            slide: function (event, ui) {
                dispatch(planetSceneSlice.actions.setAction({data: [actionR.root, {[actionR.name]: ui.value ?? 0}], slice: 'store'}))
            }
        })
    }, [range])

    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let value = Number(event.target.value)

        if (value < actionR.range![0]) {
            value = actionR.range![0]
        }
        if (value > actionR.range![1]) {
            value = actionR.range![1]
        }
        dispatch(planetSceneSlice.actions.setAction({data: [actionR.root, {[actionR.name]: value}], slice: "store"}))
    }, []);

    const element = [
        <input key="input" type="number" onChange={onInputChange} value={range}
               className="action-range-value"/>,
        <div key="slider" id={actionR.name} className={["action-range-slider", direction].join(' ')}></div>,
    ]

    const [tmpValue, setTmpValue] = useState<number>(0);
    const handleOnClick = useCallback(() => {
        setTmpValue(range)
        dispatch(planetSceneSlice.actions.setAction({data: [actionR.root, {[actionR.name]: tmpValue}], slice: 'store'}))
    }, [range]);

    return (
        <div className={[className, "action-range", direction].join(' ')}>
            <ActionElement rootRef={rootRef} actionE={actionR} handleOnClick={handleOnClick}/>
            <div className={["action-range-block", direction].join(' ')}>
                {direction.includes("left") ? element.reverse() : element}
            </div>
        </div>
    );
};

export default ActionRange;