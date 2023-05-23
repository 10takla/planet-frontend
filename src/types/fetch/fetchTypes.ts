import {IPlanet, IPlot} from "../store/threejs/planetObjectsTypes";
import {IUser} from "../user/userTypes";

export type AllowModels = IPlanet | IPlot | IUser

interface IBody<T> {
    fields?: (keyof T)[]
    to?: number
    from?: number
    search?: string
}

type PreBody<F, S, T extends string> = IBody<F> & { [K in keyof IBody<S> as `${T}_${keyof IBody<S>}`]: IBody<S>[K] }


export interface IFetch<T extends AllowModels> {
    body?: T extends IPlot ? IBody<IPlot> :
        T extends IPlanet ? PreBody<IPlanet, IPlot, 'plots'> : never
    endpoint: `${string}/`
    isToken?: boolean
}

type PlanetEndPoints = Array<'planets' | IPlanet['id'] | undefined | 'plots'>

type PlotsEndPoints = PlanetEndPoints & Array<'plots' | IPlot['id'] | 'update'>


export interface IPreFetch<T extends AllowModels> extends Omit<IFetch<T>, 'endpoint'> {
    endpoint:
        T extends IPlot ? PlotsEndPoints :
            T extends IPlanet ? PlanetEndPoints :
                never
}

export interface IFetchUpdate {
    body: Omit<IPlot, 'id' | 'name'>
    endpoint: `${string}/`
}