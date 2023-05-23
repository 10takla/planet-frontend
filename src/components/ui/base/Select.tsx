import React, {FC, useEffect, useMemo, useState} from 'react';
import "../../../styles/ui/base/select.scss"
import {ActionSelectorType, DirectionType} from "../../../types/store/panels/actionPanelTypes";

interface ISelect extends React.HTMLProps<any> {
    items: ActionSelectorType[keyof ActionSelectorType][]
    direction: DirectionType
    handleOnSelect: (selectedValue: ActionSelectorType[keyof ActionSelectorType]) => void
}

const Select: FC<ISelect> = ({direction, handleOnSelect, items, className}) => {
    const [selected, setSelected] = useState(items[0]);

    const list = useMemo(() => {
        if (direction.includes("right")){
            return items.reverse()
        }
        return items
    }, [])


    useMemo(() => {
        handleOnSelect(selected)
    }, [selected]);

    return (
        <div className={["select", direction, className].join(' ')}>
            <span>{selected}</span>
            <div className={["select-list", direction].join(' ')}>
                {list.map((item, i) =>
                    <li key={i} className={item === selected ? 'active' : ''}
                        onClick={e => setSelected(item)}>{item}</li>
                )}
            </div>
        </div>
    )
}
export default Select;