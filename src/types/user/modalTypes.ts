export type ModalType = 'basket' | 'settings' | 'plots' | 'wallet' | 'user'


export interface IModalElements {
    name: ModalType
    title: string
    content?: JSX.Element
}