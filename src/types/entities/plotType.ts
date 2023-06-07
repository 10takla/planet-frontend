import {HexColorString} from "three/src/utils";
import {IFirstViewUser} from "../user/userTypes";
import {IBuying} from "./buyingType";
import {IPlanet} from "./planetType";
import {IBasket} from "./basketType";
import {RequiredFields} from "../functionsTS";

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
    owner: IFirstViewUser | null
    planet: IPlanet
    buying?: IBuying[]
    basket?: IBasket
    surfaceArea?: number
}

export interface IPlotForStore extends RequiredFields<IPlot, 'mesh' | 'area' | 'owner'>{}