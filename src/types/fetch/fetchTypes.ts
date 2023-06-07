import {IUser} from "../user/userTypes";
import {IPlot} from "../entities/plotType";
import {IPlanet} from "../entities/planetType";
import {IBuying} from "../entities/buyingType";
import {IBasket} from "../entities/basketType";

export type AllowModels = IPlanet | IPlot | IUser | IBuying | IBasket

interface IBody<T> {
    fields?: (keyof T)[]
    to?: number
    from?: number
    search?: string
}

type PreBody<F, S, T extends string> = IBody<F> & { [K in keyof IBody<S> as `${T}_${keyof IBody<S>}`]: IBody<S>[K] }


export interface IFetch<T = any> {
    body?: T extends IPlot ? IBody<IPlot> :
        T extends IPlanet ? PreBody<IPlanet, IPlot, 'plots'> : object
    endpoint: `${string}/`
    isToken?: boolean
}

export enum FetchMethodEnum  {
    create = "POST",
    delete = "DELETE",
    update = "PATCH",
}
export interface IFetchAnyMethod extends IFetch{
    action: "create" | "delete" | "update"
}
