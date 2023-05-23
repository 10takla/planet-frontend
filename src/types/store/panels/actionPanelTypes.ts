export type ActionButtonType = 'help' | 'fullscreen' | 'grid' | 'shadow' | 'cloud' | 'myPlot'
    | 'userSearch' | 'plots' | 'userGrid' | 'plotGrid' | "dashboard" | 'plotBadge' | 'badge' | 'dashboardUser'
export type ActionRangeType = 'planetRotation' | 'cameraRotation' | 'sound'

export type ActionSelectorType = {
    resolution: '2K' | '4K',
}

export interface IActionPanel {
    buttons: { [key in ActionButtonType]: boolean }
    ranges: { [key in ActionRangeType]: number }
    selectors: ActionSelectorType
}

export type ActionType = keyof IActionPanel

export type ConvertedValueToArray<T> = {
    [K in keyof T]: T[K][]
}


export type ActionKeysType =
    keyof IActionPanel["buttons"]
    | keyof IActionPanel["ranges"]
    | keyof IActionPanel["selectors"]

export type RetrieveActionKeys<T> = T extends "buttons" ? keyof IActionPanel["buttons"]
    : T extends "ranges" ? keyof IActionPanel["ranges"]
        : T extends "selectors" ? keyof IActionPanel["selectors"]
            : never


export type ChangeActionType =
    keyof IActionPanel['buttons']
    | Partial<IActionPanel['buttons']>
    | Partial<IActionPanel['ranges']>
    | Partial<IActionPanel['selectors']>

export type ActionValue<T> = T extends "buttons" ? boolean
    : T extends "ranges" ? [number, number]
        : T extends "selectors" ? ActionSelectorType[keyof ActionSelectorType][]
            : never

export interface IActionElement<T> {
    name: RetrieveActionKeys<T>,
    type: T,
    body?: ActionValue<T>
    list?: IActionElement<ActionType>[]
    description: string
    img?: string
}


//Элементы графического интерфейска
export type ListType = "row" | "column"
export type SideType = "left" | "right"

export type DirectionType = `${ListType} ${SideType}`