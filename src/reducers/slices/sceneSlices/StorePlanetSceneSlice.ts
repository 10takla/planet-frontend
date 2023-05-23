import {IPlanet, IPlot} from "../../../types/store/threejs/planetObjectsTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {getAnyColor} from "../../../helpers/store/threejs";
import {ISceneProperties, MouseButtonEnum} from "../../../types/scene/planetSceneTypes.";

interface IAppState {
    activePlanetId: IPlanet['id'] | null
    activePlotId: IPlot['id'] | null
    scene3D: ISceneProperties
    events: {
        orbitRotation: boolean
        hoverScene: boolean
        isStopCameraAnimation: boolean
        isRepeatCameraAnimation: boolean
        isActiveCameraAnimation: boolean
        plotClick: { isClamped: boolean, distance: number }
    }
}

const initialState: IAppState = {
    activePlanetId: null,
    activePlotId: null,
    scene3D: {
        audio: {
            actions: {
                soundVolume: 10,
            }
        },
        camera: {
            radius: 5,
            plotFocusRadius: 5.5,
            factorPlotArea: 0.2,
            angle: 0,
            enableAnimation: true,
        },
        lights: {},
        orbitControl: {
            rotateSpeed: {
                [MouseButtonEnum.LEFT]: 0.8,
                [MouseButtonEnum.RIGHT]: 0.3,
            },
            actions: {
                ranges: {
                    cameraRotation: 0
                }
            }
        },
        environment: {
            source: "assets/textures/galaxy.png"
        },
        planetProperties: {
            actions: {
                buttons: {
                    isShadow: false,
                    isGrid: false,
                    isCloud: true,
                },
                ranges: {
                    rotationSpeed: 0
                },
                selectors: {
                    resolution: '2K',
                }
            },
            detail: 10,
            slices: {
                surface: {
                    radiusDifferent: 0,
                    material: {
                        shininess: 18, bumpScale: 0.004, displacementScale: 0.014
                    },
                    defaultTextures: {
                        map: "assets/textures/defaultTexture.png"
                    },
                },
                atmosphere: {
                    radiusDifferent: 0.014,
                    material: {
                        transparent: true, displacementScale: 0.014
                    }
                },
                grid: {
                    radiusDifferent: 0.015,
                    detail: 8,
                    material: {
                        wireframe: true
                    }
                },
            },
            plotsProperties: {
                materials: {
                    default: {
                        getMaterial: (color) => (
                            {
                                color: getAnyColor(color, 90),
                                opacity: 0
                            }
                        ),
                    },
                    isOwned: {
                        getMaterial: (color) => (
                            {
                                color: getAnyColor(color, 180),
                                opacity: 0.3
                            }
                        ),
                    },
                    isMeOwned: {
                        getMaterial: (color) => (
                            {
                                color: getAnyColor(color, 270),
                                opacity: 0.4
                            }
                        ),
                    },
                    isHover: {
                        getMaterial: (color) => (
                            {
                                opacity: 0.6
                            }
                        ),
                    },
                    isActive: {
                        getMaterial: (color) => (
                            {
                                opacity: 1
                            }
                        ),
                    },
                },
                radius: 1.02,
                scale: 0.98,
                actions: {
                    buttons: {
                        isMyPlot: true,
                        isPlots: true,
                        isUserPlots: true,
                        isUserGrid: true,
                        isPlotGrid: true,
                        isGrid: true,
                        isDashboard: true,
                        isDashboardUser: true,
                    }
                },
                events: {selection: {keyboard: MouseButtonEnum.LEFT}},
            }
        },
    },
    events: {
        orbitRotation: false,
        hoverScene: true,
        isStopCameraAnimation: false,
        isRepeatCameraAnimation: false,
        isActiveCameraAnimation: false,
        plotClick: {isClamped: false, distance: 0}
    },
}

export const storePlanetSceneSlice = createSlice({
    name: 'storeSettings',
    initialState,
    reducers: {
        setEvent(state, action: PayloadAction<{ [key in keyof IAppState["events"]]?: IAppState["events"][key] }>) {
            state.events = {...state.events, ...action.payload}
        },
        setActivePlanetId(state, action: PayloadAction<IPlanet['id'] | null>) {
            state.activePlanetId = action.payload
            state.activePlotId = null
        },
        setActivePlotId(state, action: PayloadAction<IPlot['id'] | null>) {
            state.activePlotId = action.payload
        },
    }
})

export const storePlanetSceneReducer = storePlanetSceneSlice.reducer


