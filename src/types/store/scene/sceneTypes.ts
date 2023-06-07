import {setRef} from "./generalTypes";
import {IPlanetProperties} from "./properties/planetPropertiesTypes";
import {ICameraProperties} from "./properties/cameraProperties";
import {IOrbitControl} from "./properties/orbitControlPropertiesTypes";
import {IPlotProperties} from "./properties/plotPropertieseTypes";
import {IPlanet} from "../../entities/planetType";
import {IPlot} from "../../entities/plotType";
import {IActionsScene} from "./actionsTypes";

interface IScene {
    plots?: IPlotProperties
    planet: IPlanetProperties
    camera: ICameraProperties
    audio?: {}
    environment?: {
        source: string
    }
    lights?: {}
    canvas?: {},
    orbitControl?: IOrbitControl
}

export interface ISceneProperties extends setRef<IScene> {

}

export interface IEventsScene {
    orbitRotation: boolean
    hoverScene: boolean
    isStopCameraAnimation: boolean
    isRepeatCameraAnimation: boolean
    isActiveCameraAnimation: boolean
    plotClick: { isClamped: boolean, distance: number }
}

export interface ISliceState {
    activePlanetId: IPlanet['id'] | null
    activePlotId: IPlot['id'] | null
    scene: ISceneProperties
    actions: IActionsScene
    events: IEventsScene
}