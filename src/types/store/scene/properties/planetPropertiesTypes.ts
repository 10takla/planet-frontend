import {MeshPhongMaterialParameters, MeshStandardMaterialParameters} from "three";
import {IPlotProperties} from "./plotPropertieseTypes";
import {IRef} from "../generalTypes";
import {ResolutionType, TextureType} from "../../../entities/planetType";

export type TextureKeys = { [key in keyof MeshStandardMaterialParameters]?: string }

export type ISlice = {
    radiusDifferent: number
    detail?: number
    material?: MeshPhongMaterialParameters & IRef
    defaultTextures?: TextureKeys
}
export type PlanetSliceType = TextureType | "grid"


export interface IPlanetProperties {
    detail: number
    slices: { [key in PlanetSliceType]?: ISlice & IRef }
}


