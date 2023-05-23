import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import ActionElement from "./ActionElement";
import {DirectionType, IActionElement} from "../../../../../types/store/panels/actionPanelTypes";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import $ from 'jquery'
import "jquery-ui/dist/jquery-ui";
import 'jquery-ui/themes/base/all.css';
import {storeStateSlice} from "../../../../../reducers/slices/StoreStateSlice";

interface IActionRange extends HTMLDivElement {
    action: IActionElement<"ranges">
    direction: DirectionType
}

const ActionRange: FC<IActionRange> = ({direction, className, action}) => {
    const [typeList, side] = direction.split(' ')
    const dispatch = useAppDispatch()
    const {ranges} = useAppSelector(state => state.storeStateReducer.actionPanel)

    useEffect(() => {
        $(`.action-range-slider.${typeList}#${action.name}`).slider({
            range: "min",
            min: action.body![0],
            max: action.body![1],
            step: (action.body![1] - action.body![0]) / 100,
            value: ranges[action.name],
            orientation: typeList === "row" ? "vertical" : "horizontal",
            slide: function (event, ui) {
                //@ts-ignore
                dispatch(storeStateSlice.actions.setActionPanel({[action.name]: ui.value}))
            }
        })
    }, [ranges[action.name]])

    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let value = Number(event.target.value)

        if (value < action.body![0]) {
            value = action.body![0]
        }
        if (value > action.body![1]) {
            value = action.body![1]
        }
        //@ts-ignore
        dispatch(storeStateSlice.actions.setActionPanel({[action.name]: value}))
    }, []);

    const element = [
        <input key="input" type="number" onChange={onInputChange} value={ranges[action.name]}
               className="action-range-value"/>,
        <div key="slider" id={action.name} className={["action-range-slider", direction].join(' ')}></div>,
    ]

    const [tmpValue, setTmpValue] = useState<number>(0);
    const handleOnClick = useCallback(() => {
        setTmpValue(ranges[action.name])
        dispatch(storeStateSlice.actions.setActionPanel({[action.name]: tmpValue}))
    }, [ranges[action.name]]);

    return (
        <div className={[className, "action-range", direction].join(' ')}>
            <ActionElement action={action} handleOnClick={handleOnClick}/>
            <div className={["action-range-block", direction].join(' ')}>
                {direction.includes("left") ? element.reverse() : element}
            </div>
        </div>
    );
};

export default ActionRange;