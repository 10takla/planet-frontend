import React, {FC} from 'react';
import {Html} from "@react-three/drei";
import {HtmlProps} from "@react-three/drei/web/Html";
import {Provider} from "react-redux";
import {store} from "../../../../index";

interface IHtmlPlot extends HtmlProps {
    children: React.ReactNode
}

const HtmlPlot: FC<IHtmlPlot> = ({children, ...props}) => {

    return (

        <Html as='div' center={true}
              occlude={[]}
              zIndexRange={[0]}
              className={'store-window-plot'}
              {...props}
        >
            <Provider store={store}>
                {children}
            </Provider>
        </Html>

    );
};

export default HtmlPlot;