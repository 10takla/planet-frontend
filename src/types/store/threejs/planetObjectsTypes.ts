import {MeshPhongMaterialParameters, MeshStandardMaterialParameters, Texture} from 'three';
import {HexColorString} from "three/src/utils";
import {IFirstViewUser, IUser} from "../../user/userTypes";
import {IPlotProperties, IRef} from "./sceneTypes";
import {RequiredFields} from "../../functionsTS";

export type TextureType = 'atmosphere' | "surface"
export type ResolutionType = "2K" | "4K"

export type ITexture = {
    [key in TextureType]: {
        [key in ResolutionType]: { [key in keyof MeshStandardMaterialParameters]: Texture["image"] }
    }
}

export interface IBasket{
    id: number
    plot: number
    user: IUser
}

export interface IBuying {
    id: number
    cost: number
    date: string
    owner: IFirstViewUser
    buyer: IFirstViewUser
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



export interface IPlot {
    id: number
    name: string
    area?: number
    price?: number
    markUp?: number
    cost?: number
    isSale?: boolean
    location?: string
    description?: string
    available_for_sale?: boolean
    mesh?: { center: [number, number, number], faces: number[], vertices: [number, number, number][] }
    color?: HexColorString
    user: IFirstViewUser | null
    planet: IPlanet
    buying?: IBuying[]
    basket?: IBasket
}

export interface IPlotForStore extends RequiredFields<IPlot, 'mesh' | 'area' | 'user'>{}

export type PlanetSliceType = TextureType | "grid"

type RetrieveKeys<T, C> = {
    [K in keyof T]-?: T[K] extends C ? K : never;
}[keyof T];
// export type TextureKeys = { [key in RetrieveKeys<MeshStandardMaterialParameters, THREE.Texture>]?: string }
export type TextureKeys = { [key in keyof MeshStandardMaterialParameters]?: string }

export type ISlice = {
    radiusDifferent: number
    detail?: number
    material?: MeshPhongMaterialParameters & IRef
    defaultTextures?: TextureKeys
}

export interface IPlanetProperties {
    detail: number
    actions: {
        buttons: Record<'isShadow' | 'isGrid' | 'isCloud', boolean>
        ranges: Record<'rotationSpeed', number>
        selectors: {
            resolution: ResolutionType
        }
    }
    plotsProperties?: IPlotProperties
    slices: { [key in PlanetSliceType]?: ISlice & IRef }
}