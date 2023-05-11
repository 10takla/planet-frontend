import {ISceneProperties, MouseButton} from "../../types/store/threejs/sceneTypes";

export const storeSettings: ISceneProperties = {
    camera: {
        radius: 6,
        angle: 0,
        enableAnimation: true,
    },
    lights: {},
    orbitControl: {
        rotateSpeed: {
            [MouseButton.LEFT]: 0.8,
            [MouseButton.RIGHT]: 0.3,
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
        }
    },
    plotsProperties: {
        radius: 1.1,
        scale: 0.99,
        actions: {
            buttons: {
                isUserSearch: true,
                isUserGrid: true,
                isPlotGrid: true,
                isGrid: true,
                isDashboard: true
            }
        }
    }
}


export const planetPanelSettings: ISceneProperties = {
    camera: {
        radius: 3.8,
        angle: 45,
        enableAnimation: false,
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
}


