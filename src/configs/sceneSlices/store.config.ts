import {ISliceState} from "../../types/store/scene/sceneTypes";
import {MouseButtonEnum} from "../../types/store/scene/properties/plotPropertieseTypes";

export const storeSlice: ISliceState = {
    activePlanetId: null,
    activePlotId: null,
    scene: {
        canvas: {},
        audio: {},
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
        },
        environment: {
            source: "assets/textures/stars_milky_way.jpg"
        },
        planet: {
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
        },
        plots: {
            materials: {
                default: {
                    offsetColor: 90,
                    opacity: 0
                },
                isNotSale: {
                    color: 'red',
                    opacity: 0.5,
                },
                owned: {
                    offsetColor: 180,
                    opacity: 0.3
                },
                ownedByMe: {
                    offsetColor: 120,
                    opacity: 0.4
                },
                hover: {
                    opacity: 0.6
                },
                active: {
                    opacity: 1
                },
            },
            radius: 1.01,
            scale: 0.98,
            events: {selection: {keyboard: MouseButtonEnum.LEFT}},
        }
    },
    actions: {
        camera: {},
        canvas: {
            isHelp: false,
            isFullScreen: false,
        },
        orbitControl: {
            cameraRotation: 0
        },
        audio: {
            soundVolume: 10,
        },
        planet: {
            isPlanet: true,
            rotationSpeed: 0,
            isShadow: false,
            resolution: '2K',
            isCloud: true,
            isGrid: false,
            isBadge: false,
        },
        plots: {
            isPlots: true,
            isUserPlots: true,
            isMyPlot: true,
            isNotSale: true,

            isPlotGrid: false,
            isUserGrid: false,

            isPlotBadge: true,
            isDashboard: false,
            isDashboardUser: false,
        }
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