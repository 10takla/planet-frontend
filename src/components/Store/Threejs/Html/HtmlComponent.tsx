import React, {FC} from 'react';
import {Html} from "@react-three/drei";
import * as THREE from 'three'

interface IHtmlComponent extends React.HTMLProps<any> {
    position: [number, number, number]
}

const HtmlComponent: FC<IHtmlComponent> = (position, {children, ...props}) => {


    return (
        // @ts-ignore
        <Html as='div' center={true} position={position}
              className={props.className} zIndexRange={[-1]} prepend={true}>
            {children}
        </Html>
    );
};

export default HtmlComponent;