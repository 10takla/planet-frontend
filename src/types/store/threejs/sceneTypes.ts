import {IPlanetProperties, ResolutionType} from "./planetObjectsTypes";
import {MouseEvent, MutableRefObject, RefObject} from "react";
import {OrbitControlsProps} from "@react-three/drei";

export interface IPlotProperties {
    radius: number
    scale: number
    actions: {
        buttons: Record<'isUserSearch' | 'isUserGrid' | 'isPlotGrid' | 'isGrid' | 'isDashboard', boolean>
    }
}

export enum MouseButton {
    LEFT = 0,
    RIGHT = 1,
    MIDDLE = 2,
}

export interface IOrbitControl {
    rotateSpeed: {
        [key in MouseEvent<HTMLDivElement>["button"]]: number
    },
    actions: {
        ranges: Record<'cameraRotation', number>
    },
    control?: OrbitControlsProps
}


export interface ICameraProperties {
    radius: number
    angle: number
    enableAnimation: boolean
}

interface IScene {
    planetProperties: IPlanetProperties
    camera: ICameraProperties
    plotsProperties?: IPlotProperties
    environment?: {
        source: string
    }
    lights?: {}
    orbitControl?: IOrbitControl
}

export interface IRef {
    ref?: MutableRefObject<any>
}

export type setRef<T> = { [K in keyof T]: T[K] & IRef }

export interface ISceneProperties extends setRef<IScene> {

}