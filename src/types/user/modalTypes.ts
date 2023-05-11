export type ModalType = 'basket' | 'settings' | 'plots' | 'wallet'


export interface IModalElements {
    name: ModalType
    title: string
    content?: JSX.Element
}