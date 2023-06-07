import React, {FC, useEffect} from 'react';
import Basket from "../../../../../../ui/actions/stateChangers/Basket/Basket.";
import Buying from "../../../../../../ui/actions/stateChangers/Buying/Buying";
import {div} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {IPlot} from "../../../../../../../types/entities/plotType";
import {RequiredFields} from "../../../../../../../types/functionsTS";

interface IActionsForBuyer {
    plot: RequiredFields<IPlot, 'isSale' | 'basket'>
}

const ActionsForBuyer: FC<IActionsForBuyer> = ({plot}) => {

    return (
        <React.Fragment>
            <Basket className={'action selectable'} basket={plot.basket} plotId={plot.id}/>
            {plot.isSale ?
                <Buying className={'action selectable'} plotId={plot.id}/>
                :
                <div>Не продается</div>
            }
        </React.Fragment>
    );
};

export default ActionsForBuyer;