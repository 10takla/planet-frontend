import {IFirstViewUser} from "../user/userTypes";

export interface IBuying {
    id: number
    cost: number
    date: string
    owner: IFirstViewUser
    buyer: IFirstViewUser
}
