import {RequiredFields} from "../functionsTS";
import {CSSProperties} from "react";

export interface IUser {
    id: number
    username: string
    email?: string
    logo?: string
    wallet?: number
    color?: CSSProperties['color']
    telegramName?: string
    status?: string
    plotsCount?: number
    plotCapital?: number
    rank?: number
}

type FieldsCurrentUserType = 'logo' | 'email' | 'wallet' | 'color'

export interface IAuthUser extends RequiredFields<IUser, FieldsCurrentUserType> {
    token: string
}

export type FieldsFirstViewUserType = 'logo' | 'color'

export interface IFirstViewUser extends RequiredFields<IUser, FieldsFirstViewUserType> {

}

export type FieldsFocusViewUserType = 'rank' | 'status' | 'telegramName' | 'color' | 'plotCapital' | 'plotsCount'

export interface IFocusViewUser extends RequiredFields<IFirstViewUser, FieldsFocusViewUserType> {

}

export interface IComments {
    id: number
    user?: IUser
    text: string
    date: `${number}.${number}.${number}`
}