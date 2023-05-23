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

export type FieldsFirstViewUserType = 'logo'

export interface IFirstViewUser extends RequiredFields<IUser, FieldsFirstViewUserType> {

}

export type FieldsFocusViewUserType = 'rank' | 'status' | 'telegramName' | 'color' | 'plotCapital' | 'plotsCount'

export interface IFocusViewUser extends RequiredFields<IFirstViewUser, FieldsFocusViewUserType> {

}

type FieldsCurrentUserType = 'logo' | 'email' | 'wallet'

export interface ICurrentUser extends RequiredFields<IUser, FieldsCurrentUserType> {

}

export interface IComments {
    id: number
    user?: IUser
    text: string
    date: `${number}.${number}.${number}`
}