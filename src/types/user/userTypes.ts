export interface IUser {
    id: number
    username: string
    email?: string
    logo?: string
    waller?: string
    color?: string
}

export interface ICurrentUser {
    id: number
    username: string
    email: string
    logo: string
    wallet: number
}

export interface IComments {
    id: number
    user?: IUser
    text: string
    date: `${number}.${number}.${number}`
}