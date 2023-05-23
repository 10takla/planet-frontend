import {IPlanetProperties, ResolutionType} from "./planetObjectsTypes";
import {CSSProperties, MouseEvent, MutableRefObject, RefObject} from "react";
import {OrbitControlsProps} from "@react-three/drei";
import {getAnyColor, getContrastColor} from "../../../helpers/store/threejs";
import {MeshPhongMaterialParameters, MeshStandardMaterial, MeshStandardMaterialParameters} from "three";
import {HexColorString} from "three/src/utils";


type CompleteMaterialType = (color: CSSProperties["color"]) => { color?: CSSProperties["color"] } | MeshStandardMaterialParameters

export type PlotMaterialType = 'default' | 'isOwned' | 'isHover' | 'isActive' | 'isMeOwned'

export interface IPlotProperties {
    materials: {
        [key in PlotMaterialType]:
        { getMaterial: CompleteMaterialType }
    },
    radius: number
    scale: number
    actions: {
        buttons: Record<'isUserPlots' | 'isMyPlot' | 'isUserGrid' | 'isPlotGrid' | 'isPlots' | 'isGrid' | 'isDashboard' | 'isDashboardUser', boolean>
    }
    events: {
        selection: { keyboard: MouseButtonEnum }
    }
}

export enum MouseButtonEnum {
    LEFT = 0,
    RIGHT = 1,
    MIDDLE = 2,
}

export interface IOrbitControl {
    rotateSpeed?: {
        [key in MouseEvent<HTMLDivElement>["button"]]: number
    },
    actions?: {
        ranges: Record<'cameraRotation', number>
    },
    control?: OrbitControlsProps
}


export interface ICameraProperties {
    radius: number
    plotFocusRadius?: number
    factorPlotArea?: number
    angle: number
    enableAnimation: boolean
}


interface IScene {
    planetProperties: IPlanetProperties
    camera: ICameraProperties
    audio?: {
        actions?: {
            ranges: Record<'soundVolume', number>
        }
    }
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