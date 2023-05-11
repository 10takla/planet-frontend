import React, {MouseEvent, useCallback, useEffect, useState} from 'react';
import PlotInfo from "../../Panels/infoPanel/infoPanelComponents/PlotInfo";
import PlotGallery from "./Plot/Content/PlotGallery";
import {storeStateSlice} from "../../../../reducers/slices/StoreStateSlice";
import {useAppDispatch} from "../../../../hooks/redux";

const Test = () => {

    const forms = [
        {name: 'bag', content: <PlotInfo/>, title: 'Купить'},
        {name: 'info', content: <div>s</div>, title: 'Информация'},
        {name: 'image', content: <PlotGallery/>, title: 'Галлерея'}
    ]
    const [activeForm, setActiveForm] = useState<string | null>(null);


    return (
        <div>
            Привет из компонента Test!
        </div>
    );
};

export default Test;