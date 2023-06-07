import {CombineActionsType} from "../../types/store/scene/actionsTypes";

export const bottomPanel: CombineActionsType[] = [
    {
        name: 'isFullScreen', img: 'fullscreen', description: 'Полный экран'
    },
    {
        name: 'soundVolume', range: [0, 100], img: 'sound', description: 'Громкость'
    },
    {
        name: 'cameraRotation', range: [0, 100], img: 'cameraRotation', description: 'Вращение камеры'
    },
    {
        name: 'isPlanet', img: 'planet', description: 'Планета', actions: [
            {name: 'isShadow', img: 'shadow', description: 'Тень'},
            {name: 'isCloud', img: 'cloud', description: 'Атмосфера'},
            {name: 'resolution', options: ['2K', '4K'], description: 'Разрешение текстур'},
            {name: 'isGrid', img: 'grid', description: 'Сетка',},
            {name: 'isBadge', img: 'badge', description: 'Иконки'},
        ]
    },
    {
        name: 'isPlots', img: 'plots', description: 'Участки', actions: [
            {name: 'isUserPlots', img: 'groupUsers', description: 'Участки пользователей', actions: [
                    {name: 'isMyPlot', img: 'user', description: 'Мои участки'},
                ]},
            {name: 'isNotSale', img: 'do_not', description: 'Не продаются',},
            {name: 'isPlotBadge', img: 'badge', description: 'Иконки'},
            {name: 'isDashboard', img: 'dashboard', description: 'Иконки', actions: [
                    {name: 'isDashboardUser', img: 'user', description: 'Иконки пользователей'},
                ]},
            {name: 'isPlotGrid', img: 'grid', description: 'Сетка', actions: [
                    {name: 'isUserGrid', img: 'user', description: 'Сетка участков пользователей'},
                ]},

        ]
    },
]

export const topPanel: CombineActionsType[] = [
    {
        name: 'isHelp', img: 'help', description: 'Помощь'
    },
]