import React from 'react';
import ActionPanel from "./ActionPanel/ActionPanel";
import InfoPanel from "./InfoPanel/InfoPanel";
import PlanetPanel from "./PlanetPanel/PlanetPanel";
import {ActionType, IActionElement} from "../../../types/store/panels/actionPanelTypes";

const CombinePanels = () => {
    const obj: IActionElement<ActionType>[] = [
        {name: 'fullscreen', type: 'buttons', description: 'Открыть в полный экран'},
        {name: 'cameraRotation', type: 'ranges', body: [0, 100], description: 'Вращение вопркг планеты'},
        {name: 'sound', type: 'ranges', body: [0, 100], description: 'Громкость звука'},
        {
            name: 'shadow', type: 'buttons', description: 'Тени', list: [
                {name: 'grid', type: 'buttons', description: 'Показать сетку'},
                {name: 'planetRotation', type: 'ranges', body: [0, 100], description: 'Вращение планеты вокруг оси'},
                {name: 'resolution', type: 'selectors', body: ["2K", "4K"], description: 'Качество текстур'},
                {name: 'cloud', type: 'buttons', description: 'Атмосфера'},
            ]
        },
        {
            name: 'plots', type: 'buttons', description: 'Показать участки', list: [
                {
                    name: 'userSearch', img:'groupUsers', type: 'buttons', description: 'Показать участки с владельцами', list: [
                        {name: 'myPlot', img: 'user', type: 'buttons', description: 'Мои участки'},
                        {name: 'userGrid', img: 'grid', type: 'buttons', description: 'Показать сетку'},
                        {name: 'dashboardUser', img: 'dashboard', type: 'buttons', description: 'Показать сетку'},
                    ],
                },
                {name: 'dashboard', type: 'buttons', description: 'Панели участков'},
                {name: 'plotGrid', img: 'grid', type: 'buttons', description: 'Показать сетку'},
                {name: 'plotBadge', img: 'badge', type: "buttons", description: "Показать информацию участков"}
            ]
        },
        {name: 'badge', img: 'badge', type: "buttons", description: "Показать информацию"}
    ]

    const tmp: IActionElement<ActionType>[] = [
        {name: 'help', type: 'buttons', description: "Подсказка"},
    ]

    return (
        <div className="store-panels">
            <div className="store-panels-top">
                <div className="store-panels-top-left">
                    <ActionPanel direction={"row left"} list={tmp} className="top"/>
                    <InfoPanel/>
                </div>
                <PlanetPanel/>
            </div>
            <ActionPanel direction={"row right"} list={obj} className="bottom"/>
        </div>
    );
}


export default CombinePanels;