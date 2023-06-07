import React, {FC, useEffect,} from 'react';
import {useAppSelector} from "../../../../../../hooks/redux";
import {IPlot} from "../../../../../../types/entities/plotType";
import {RequiredFields} from "../../../../../../types/functionsTS";
import Label from "../../../../../ui/base/Label";
import Currency from "../../../../../ui/info/plot/Currency";
import SurfaceArea from "../../../../../ui/info/plot/SurfaceArea";
import {getAnyColor} from "../../../../../../helpers/store/threejs";
import UserFocus from "../../../../../ui/userViews/UserFocus";
import Basket from "../../../../../ui/actions/stateChangers/Basket/Basket.";
import Buying from "../../../../../ui/actions/stateChangers/Buying/Buying";
import {div} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {usePlot} from "../../../../../../hooks/useDataById";
import ActionsForOwner from "./actions/ActionsForOwner";
import ActionsForBuyer from "./actions/ActionsForBuyer";

interface IPlotInfo {

}


const PlotInfo: FC<IPlotInfo> = ({}) => {
    const authUser = useAppSelector(state => state.userDataReducer.authUser)
    type RF = RequiredFields<IPlot, 'surfaceArea' | 'markUp' | 'price' | 'cost' | "isSale" | "owner" | 'color' | 'basket' | 'buying'>

    const plot = usePlot() as RF
    useEffect(() => {
        // console.log(plot)
    }, [plot]);

    return (
        <div className='plots-product-card' style={{background: getAnyColor(plot.color, 0, 30)}}>
            <div className="title">
                {plot.name}
                {/*<PlanetScene/>*/}
            </div>
            <div className="body">
                <div className={'top-side-bar'}>
                    <div className='owner'>
                        {plot.owner ?
                            plot.owner?.id === authUser?.id ?
                                <div>Ваш участок</div>
                                : <Label>Владелец: <UserFocus user={plot.owner}/></Label>
                            : <div>нет владельца</div>
                        }
                    </div>
                </div>
                <div className={'content'}>
                    <Label>Стоимость: <Currency amount={plot.cost}/></Label>
                    <Label>Площадь: <SurfaceArea area={plot.surfaceArea}/></Label>
                </div>
            </div>
            <div className="actions">
                {plot && authUser && plot.price && plot.owner?.id === authUser?.id ?
                    <ActionsForOwner plot={plot}/>
                    :
                    <ActionsForBuyer plot={plot}/>
                }
            </div>
        </div>
    )
};

export default PlotInfo;