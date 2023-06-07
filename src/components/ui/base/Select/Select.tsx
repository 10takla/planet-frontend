import React, {FC, MouseEvent, useCallback, useEffect, useMemo, useState} from 'react';
import "./select.scss"
import {DirectionType} from "../../../../types/store/panels/actionPanelTypes";
import {SelectorsType} from "../../../../types/store/scene/actionsTypes";

interface ISelect extends React.HTMLProps<any> {
    items: SelectorsType[keyof SelectorsType][]
    direction: DirectionType
    handleOnSelect:  (selectedValue: SelectorsType[keyof SelectorsType]) => void
}

const Select: FC<ISelect> = ({direction, handleOnSelect, items, className}) => {
    const [selected, setSelected] = useState(items[0]);

    const list = useMemo(() => {
        if (direction.includes("right")){
            return items.reverse()
        }
        return items
    }, [])

    const onLiClick = useCallback((item: SelectorsType[keyof SelectorsType]) => {
        handleOnSelect(item)
        setSelected(item)
    }, []);

    return (
        <div className={["select", direction, className].join(' ')}>
            <span>{selected}</span>
            <div className={["select-list", direction].join(' ')}>
                {list.map((item, i) =>
                    <li key={i} className={item === selected ? 'active' : ''}
                        onClick={()=> onLiClick(item)}>{item}</li>
                )}
            </div>
        </div>
    )
}
export default Select;