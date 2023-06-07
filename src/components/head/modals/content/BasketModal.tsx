import React, {useState} from 'react';
import {RequiredFields} from "../../../../types/functionsTS";
import {IPlot} from "../../../../types/entities/plotType";
import {IFetch} from "../../../../types/fetch/fetchTypes";
import FetchList from "../../../ui/base/scrollList/FetchList/FetchList";
import {getAnyColor} from "../../../../helpers/store/threejs";
import Label from "../../../ui/base/Label";
import OpenInStore from "../../../ui/actions/OpenInStore";
import Buying from "../../../ui/actions/stateChangers/Buying/Buying";

const BasketModal = () => {
    type RF = RequiredFields<IPlot, 'mesh' | 'price' | 'buying' | 'markUp' | 'isSale'>
    const [allPlots, setAllPlots] = useState<RF[]>([]);

    const body: IFetch<IPlot> = {
        endpoint: 'user/me/planets/plots/basket/',
        body: {
            fields: ["mesh", "price", "buying", 'markUp', "isSale", 'planet'],
        },
        isToken: true
    }

    return (
        <div className="modal-content-basket">
            <FetchList size={8} {...body} returnList={setAllPlots}>
                {allPlots.map((plot =>
                        <div key={plot.id} className={'item'}
                             style={{background: getAnyColor(plot.planet.color, 0, 20)}}>
                            <div className={'content'}>
                                <div className="info">
                                    <h3>{plot.name}</h3>
                                    <Label>Планета: {plot.planet.name}</Label>
                                </div>
                                <Buying plotId={plot.id}/>
                            </div>
                            <OpenInStore plot={plot}/>
                        </div>
                ))}
            </FetchList>
        </div>
    );
};

export default BasketModal;