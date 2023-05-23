import React, {useEffect, useState} from 'react';
import {IPlot} from "../../../../../types/store/threejs/planetObjectsTypes";
import BuyingStory from "./ui/BuyingStory";
import {convertBuying} from "../../../../../helpers/modals/convertBuying";
import SaleState from "./ui/SaleState";
import Cost from "./ui/Cost";
import {getAnyColor} from "../../../../../helpers/store/threejs";
import FetchList from "../../../../ui/base/scrollList/FetchList/FetchList";
import OpenInStore from "../../../../ui/actions/OpenInStore";
import {IFetch} from "../../../../../types/fetch/fetchTypes";
import {RequiredFields} from "../../../../../types/functionsTS";
import Label from "../../../../ui/base/Label";


const PlotsContent = () => {
    type RF = RequiredFields<IPlot, 'mesh' | 'price' | 'buying' | 'markUp' | 'isSale'>
    const [allPlots, setAllPlots] = useState<RF[]>([]);

    const body: IFetch<IPlot> = {
        endpoint: 'user/me/planets/plots/',
        body: {
            fields: ["mesh", "price", "buying", 'markUp', "isSale", 'planet'],
        },
        isToken: true
    }
    return (
        <div className="modal-content-plots">
            <FetchList size={8} {...body} returnList={setAllPlots}>
                {allPlots.map((plot =>
                        <div key={plot.id} className={'item'}
                             style={{background: getAnyColor(plot.planet.color, 0, 20)}}>
                            <div className={'content'}>
                                <div className="info">
                                    <h3>{plot.name}</h3>
                                    <Label>Планета: {plot.planet.name}</Label>
                                    {plot.buying &&
                                        <div className={'buying'}>
                                            <label>Куплен: <span className={'date'}>
                                                {convertBuying(plot.buying[0]?.date)}</span>
                                            </label>
                                            <BuyingStory buying={plot.buying}/>
                                        </div>
                                    }
                                </div>
                                <div className={'cost-info'}>
                                    <Cost plotID={plot.id} price={plot.price!} mark={plot.markUp!}/>
                                    <SaleState plotId={plot.id} isSale={plot.isSale!}/>
                                </div>
                            </div>
                            <OpenInStore plot={plot}/>
                        </div>
                ))}
            </FetchList>
        </div>
    );
};

export default PlotsContent;