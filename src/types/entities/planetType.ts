import {MeshStandardMaterialParameters, Texture} from "three";
import {HexColorString} from "three/src/utils";
import {IPlotForStore} from "./plotType";
import {RequiredFields} from "../functionsTS";

export type TextureType = 'atmosphere' | "surface"
export type ResolutionType = "2K" | "4K"

export type ITexture = {
    [key in TextureType]: {
        [key in ResolutionType]: { [key in keyof MeshStandardMaterialParameters]: Texture["image"] }
    }
}


export interface IPlanet {
    id: number
    name: string
    rating?: number
    plots_count?: number
    type?: string
    diameter?: number
    mass?: number
    number_of_satellites?: number
    surface_area?: number
    potential_for_life_percent?: boolean
    available_land_area?: number
    average_land_price?: number
    infrastructure_information?: string
    location_information?: string
    additional_features?: string
    textures?: ITexture
    plots?: IPlotForStore[]
    color?: HexColorString
    description?: string
}

export interface IStorePlanet extends RequiredFields<IPlanet, 'plots'>{

}