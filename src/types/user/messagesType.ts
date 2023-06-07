export interface IMessage {
    id?: number
    text: string | JSX.Element
    lifetime?: number | null
    isNotice: boolean
    date?: string
}