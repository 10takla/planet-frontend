import React, {FC, MouseEvent, useCallback, useEffect, useState} from 'react';
import PlotInfo from "../../../panels/InfoPanel/infoPanelComponents/plotInfo/PlotInfo";
import PlotGallery from "./Content/PlotGallery";
import {ASSETS_URL} from "../../../../../config";
import {usePlot} from "../../../../../hooks/useDataById";
import {IPlot} from "../../../../../types/entities/plotType";

interface IPlotHtml extends React.HTMLProps<any> {
    plot: IPlot
}

const PlotHtml: FC<IPlotHtml> = ({plot, ...props}) => {
    // const dispatch = useAppDispatch() <PlotInfo plot={plot}/>
    const forms = [
        {name: 'bag', content: '', title: 'Купить'},
        {name: 'info', content: <div>s</div>, title: 'Информация'},
        {name: 'image', content: <PlotGallery/>, title: 'Галлерея'}
    ]

    const [activeForm, setActiveForm] = useState<string | null>(null);

    useEffect(() => {
        // activeForm && dispatch(storeStateSlice.actions.setEvent({"isRepeatCameraAnimation": false}))
    }, [activeForm]);

    const onHtmlPointerOver = (event: any) => {
        if (event.type === 'mouseenter') {
            // dispatch(storeStateSlice.actions.setEvent({"hoverScene": false}))
        }
        if (event.type === 'mouseleave') {
            // dispatch(storeStateSlice.actions.setEvent({"hoverScene": true}))
        }
    };

    const onImgClick = useCallback((event: MouseEvent<HTMLImageElement>) => {
        // dispatch(storeStateSlice.actions.setEvent({"hoverScene": true}))
        setActiveForm(null)
    }, []);

    return (
        <div onMouseEnter={onHtmlPointerOver} onMouseLeave={onHtmlPointerOver}>
            {!activeForm &&
                <div className='plot-menu'>
                    {forms.map((form, i) =>
                        // @ts-ignore
                        <div key={i} className='plot-menu-button' style={{'--i': i, '--n': forms.length}}>
                            <img onClick={e => setActiveForm(form.name)} src={ASSETS_URL + `/images/${form.name}.svg`}/>
                        </div>
                    )}
                </div>
            }
            {forms.map((form, i) => (
                form.name === activeForm &&
                <div key={i} className='plot-content'>
                    <div className='plot-content-title'>
                        <h2>{form.title}</h2>
                        <img onClick={onImgClick} className='.close'
                             src={ASSETS_URL + "/images/close.svg"}/>
                    </div>
                    {form.content}
                </div>
            ))}
        </div>
    );
};

export default PlotHtml;