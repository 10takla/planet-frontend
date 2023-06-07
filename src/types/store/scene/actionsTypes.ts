import {ISceneProperties} from "./sceneTypes";
import {IDescription} from "../panels/actionPanelTypes";

type tmp = { [key in keyof ISceneProperties]: any }

type PlanetButtons = 'isPlanet' | 'isShadow' | 'isBadge' | 'isGrid' | 'isCloud'
type PlotsButtons = 'isMyPlot' | 'isPlotBadge' | 'isPlots' | 'isUserPlots'
    | 'isUserGrid' | 'isPlotGrid' | 'isDashboard' | 'isDashboardUser' | 'isNotSale'
type CanvasButtons = 'isHelp' | 'isFullScreen'

export type ButtonsType = PlanetButtons | PlotsButtons | CanvasButtons

type OrbitControlRanges = 'cameraRotation'
type AudioRanges = 'soundVolume'
type PlanetRanges = 'rotationSpeed'

export type RangesType = OrbitControlRanges | AudioRanges | PlanetRanges

type PlanetSelectors = {
    resolution: '2K' | '4K',
}

export type SelectorsType = PlanetSelectors

export interface IActionsScene extends tmp {
    orbitControl: Record<OrbitControlRanges, number>,
    audio: Record<AudioRanges, number>,
    planet: Record<PlanetRanges, number>
        & PlanetSelectors
        & Record<PlanetButtons, boolean>,
    plots: Record<PlotsButtons, boolean>,
    canvas: Record<CanvasButtons, boolean>
}


export type ActionType = ButtonsType | RangesType | keyof SelectorsType

interface IActionElement extends IDescription {
    img: string
}

interface IButtonAction extends IActionElement {
    name: ButtonsType
    actions?: CombineActionsType[]
}

interface IRangeAction extends IActionElement {
    name: RangesType
    range: [number, number]
}

interface ISelectorAction extends IDescription{
    name: keyof SelectorsType
    options: SelectorsType[keyof SelectorsType][]
}

export type CombineActionsType = IButtonAction | IRangeAction | ISelectorAction

export type MutateAction = {
    name: ActionType
    type: 'button' | 'range' | 'selector'
    root: keyof ISceneProperties
}

export interface IModernActionElement extends IActionElement, MutateAction{}
export type IModernButtonAction = IButtonAction & MutateAction
export type IModernRangeAction = IRangeAction & MutateAction
export type IModernSelectorAction = ISelectorAction & MutateAction


export type IModernCombineActions = IModernButtonAction | IModernRangeAction | IModernSelectorAction

export interface IActionPanelElement<T extends ActionType> {
    name: T,
    type: T extends ButtonsType ? 'button'
        : T extends RangesType ? 'range'
            : T extends keyof SelectorsType ? 'selector'
                : never
    root: keyof ISceneProperties
    actions?: IActionForPanel[]
    img?: string
    description: IDescription
}


export interface IActionForPanel {
    name: ActionType,
    type: 'button' | 'range' | 'selector'
    root: keyof ISceneProperties
    actions?: IActionForPanel[]
    img?: string
    range?: [number, number]
    options?: string[]
    description: IDescription
}

export type FinalAction = IActionForPanel | CombineActionsType

export type ChangeActionType = [keyof ISceneProperties, { [key in string]: number | boolean | string }]