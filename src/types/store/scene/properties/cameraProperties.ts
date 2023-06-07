
export interface ICameraFocus {
    center?: [number, number, number],
    factorRange: number
}


export interface ICameraProperties {
    radius: number
    plotFocusRadius?: number
    factorPlotArea?: number
    angle: number
    enableAnimation: boolean
    focus?: ICameraFocus
}
