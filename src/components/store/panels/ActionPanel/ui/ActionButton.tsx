import React, {FC, useCallback} from 'react';
import ActionElement from "./ActionElement";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import {planetSceneSlice,} from "../../../../../reducers/slices/scene/planetSceneSlice";
import {IModernButtonAction} from "../../../../../types/store/scene/actionsTypes";

interface IActionButton extends React.HTMLProps<HTMLDivElement> {
    actionB: IModernButtonAction
    rootRef?:React.MutableRefObject<HTMLDivElement | null>
}

const ActionButton: FC<IActionButton> = ({className, actionB, rootRef}) => {
    const dispatch = useAppDispatch()
    const actionValue = useAppSelector(state => state.planetSceneReducer.store.actions[actionB.root][actionB.name])

    const handleOnClick = useCallback(() => {
        dispatch(planetSceneSlice.actions.setAction({data: [actionB.root, {[actionB.name]: !actionValue}], slice: 'store'}))
    }, [actionValue]);

    return (
        <div className={[className, "action-button"].join(' ')}>
            <ActionElement actionE={actionB} handleOnClick={handleOnClick} rootRef={rootRef}/>
        </div>
    );
};

export default ActionButton;