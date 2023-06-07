import React, {FC, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import SaleState from "../../../../../../ui/actions/stateChangers/SaleState/SaleState";
import {div} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import Cost from "../../../../../../ui/actions/stateChangers/Cost/Cost";
import {IPlot} from "../../../../../../../types/entities/plotType";
import {RequiredFields} from "../../../../../../../types/functionsTS";

interface IActionsForOwner {
    plot: RequiredFields<IPlot, 'markUp' | 'price' | 'cost' | "isSale">

}

const ActionsForOwner: FC<IActionsForOwner> = ({plot}) => {
    const [isVisibleMarkUp, setIsVisibleMarkUp] = useState(false);
    const actionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
            if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
                setIsVisibleMarkUp(false);
            }
        };
        // @ts-ignore
        document.addEventListener('click', handleClickOutside);
        return () => {// @ts-ignore
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <React.Fragment>
            <SaleState plotId={plot.id} isSale={plot.isSale}/>
            <div className={'markUp action'} ref={actionsRef}>
                <button onClick={() => setIsVisibleMarkUp(!isVisibleMarkUp)}>Установить наценку</button>
                {isVisibleMarkUp && <Cost {...plot}/>}
            </div>
        </React.Fragment>
    );
};

export default ActionsForOwner;