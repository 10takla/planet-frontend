import React, {useEffect, useMemo, useRef} from 'react';
import InfoPanel from "./InfoPanel/InfoPanel";
import PlanetPanel from "./PlanetPanel/PlanetPanel";
import {useAppSelector} from "../../../hooks/redux";
import {CombineActionsType, IModernButtonAction, MutateAction} from "../../../types/store/scene/actionsTypes";
import ActionPanel from "./ActionPanel/ActionPanel";
import {bottomPanel, topPanel} from "../../../configs/action panels/panels.config";

const CombinePanels = () => {
    const actions = useAppSelector(state => state.planetSceneReducer.store.actions)

    const panel = useMemo(() => {
        const tmp = Object.entries(actions).map(([actionType, actions]) =>
            Object.entries(actions).map(([actionName, actionValue]) => {
                    const type = typeof actionValue === 'boolean' ? 'button'
                        : typeof actionValue === 'number' ? 'range'
                            : typeof actionValue === 'string' && 'selector'
                    return {name: actionName, type: type, root: actionType,}
                }
            )
        )
        return tmp.flat() as MutateAction[]
    }, []);

    const recursData = (list: CombineActionsType[]): IModernButtonAction[] => {
        return list.map(item => {
                const find = panel.find(o => o.name === item.name)
                let tmp = {}
                if (find) {
                    tmp = {...item, ...find}
                }
                if ("actions" in item && item.actions) {
                    tmp = {...tmp, actions: recursData(item.actions)}
                }
                return {...item, ...tmp as IModernButtonAction}
            }
        )
    }

    const bottom = useMemo<IModernButtonAction[]>(() => {
        return recursData(bottomPanel)
    }, [panel]);

    const top = useMemo<IModernButtonAction[]>(() => {
        return recursData(topPanel)
    }, [panel]);

    const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="store-panels" ref={rootRef}>
            <div className="store-panels-top">
                <div className="store-panels-top-left">
                    <ActionPanel rootRef={rootRef} direction={"row left"} list={top} className="top"/>
                    <InfoPanel/>
                </div>
                <PlanetPanel/>
            </div>
            <ActionPanel rootRef={rootRef} direction={"row right"} list={bottom} className="bottom"/>
        </div>
    );
}


export default CombinePanels;