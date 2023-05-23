import {ISceneProperties, MouseButtonEnum} from "../../types/store/threejs/sceneTypes";
import {getAnyColor} from "../../helpers/store/threejs";

export const plotsModalSettings: ISceneProperties = {
    camera: {
        radius: 2.8,
        angle: 10,
        enableAnimation: false,
    },
    lights: {},
    environment: {
        source: "assets/textures/galaxy.png"
    },
    planetProperties: {
        // plotsProperties: {
        //     materials: {
        //         default: {
        //             getMaterial: (color) => (
        //                 {
        //                     color: getAnyColor(color, 120),
        //                     opacity: 0.8
        //                 }
        //             ),
        //         },
        //         isOwned: {
        //             getMaterial: (color) => (
        //                 {
        //                     color: getAnyColor(color, 180),
        //                     opacity: 0.3
        //                 }
        //             ),
        //         },
        //         isHover: {
        //             getMaterial: (color) => (
        //                 {
        //                     opacity: 0.6
        //                 }
        //             ),
        //         },
        //         isActive: {
        //             getMaterial: (color) => (
        //                 {
        //                     opacity: 1
        //                 }
        //             ),
        //         },
        //     },
        //     radius: 1.02,
        //     scale: 0.98,
        //     actions: {
        //         buttons: {
        //             isUserSearch: true,
        //             isUserGrid: true,
        //             isPlotGrid: true,
        //             isGrid: true,
        //             isDashboard: true
        //         }
        //     },
        //     events: {selection: {keyboard: MouseButtonEnum.LEFT}},
        // },
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
    },
}




