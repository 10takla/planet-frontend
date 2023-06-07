import React from "react";

export type ActionButtonType = 'help' | 'fullscreen' | 'grid' | 'shadow' | 'cloud' | 'myPlot'
    | 'userSearch' | 'plots' | 'userGrid' | 'plotGrid' | "dashboard" | 'plotBadge' | 'badge' | 'dashboardUser'

export type ActionSelectorType = {
    resolution: '2K' | '4K',
}

export interface IDescription{
    description: string
    isActive?: boolean
    oppositeDescription?: string
}


export interface IActionPanel extends IDescription{
    name: string
    img: string
}



//Элементы графического интерфейска
export type ListType = "row" | "column"
export type SideType = "left" | "right"

export type DirectionType = `${ListType} ${SideType}`