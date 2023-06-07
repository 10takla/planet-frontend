import {ISliceState} from "../../types/store/scene/sceneTypes";

export const panelSlice: ISliceState = {
    activePlanetId: null,
    activePlotId: null,
    scene: {
        camera: {
            radius: 3.6,
            angle: 45,
            enableAnimation: false,
        },
        orbitControl: {
            control: {
                enableRotate: false,
                enableZoom: false,
            }
        },
        planet: {
            detail: 3,
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
            }
        },
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
            isPlotBadge: false,
            isMyPlot: true,
            isUserPlots: true,
            isNotSale: true,
            isPlotGrid: true,
            isUserGrid: true,
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