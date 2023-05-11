import React from 'react';
import {Html} from "@react-three/drei";

const Loading = () => {
    return (
        <Html center={true}>
            <svg className="store-window-loading-planet" xmlns="http://www.w3.org/2000/svg" height="80" width="80"
                 viewBox="0 0 48 48">
                <path
                    d="M15.8 41h16.4v-6.35q0-3.5-2.375-6.025Q27.45 26.1 24 26.1t-5.825 2.525Q15.8 31.15 15.8 34.65ZM8 44v-3h4.8v-6.35q0-3.5 1.825-6.425T19.7 24q-3.25-1.3-5.075-4.25Q12.8 16.8 12.8 13.3V7H8V4h32v3h-4.8v6.3q0 3.5-1.825 6.45T28.3 24q3.25 1.3 5.075 4.225Q35.2 31.15 35.2 34.65V41H40v3Z"/>
            </svg>
        </Html>
    );
};

export default Loading;