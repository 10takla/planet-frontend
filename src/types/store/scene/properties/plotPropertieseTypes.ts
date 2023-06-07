import {CSSProperties} from "react";
import {MeshStandardMaterialParameters} from "three";

export enum MouseButtonEnum {
    LEFT = 0,
    RIGHT = 1,
    MIDDLE = 2,
}

export type PlotMaterialType = 'default' | 'owned' | 'ownedByMe' | 'hover' | 'active' | 'isNotSale'

export interface IPlotProperties {
    materials: {
        [key in PlotMaterialType]: { offsetColor?: number } & MeshStandardMaterialParameters
    },
    radius: number
    scale: number
    events: {
        selection: { keyboard: MouseButtonEnum }
    }
}
