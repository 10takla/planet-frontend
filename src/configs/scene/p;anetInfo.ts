import {ISceneProperties, MouseButton} from "../../types/store/threejs/sceneTypes";

export const planetInfoSettings: ISceneProperties = {
    camera: {
        radius: 4.5,
        angle: 15,
        enableAnimation: false
    },
    environment: {
        source: "assets/textures/galaxy.png"
    },
    orbitControl: {
        rotateSpeed: {
            [MouseButton.LEFT]: 0.8,
            [MouseButton.RIGHT]: 0.3,
        },
        control: {
            enableRotate: false,
            enableZoom: false,
        },
        actions: {
            ranges: {
                cameraRotation: 100
            }
        }
    },
    planetProperties: {
        actions: {
            buttons: {
                isShadow: false,
                isGrid: true,
                isCloud: true,
            },
            ranges: {
                rotationSpeed: 0,
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
            atmosphere: {
                radiusDifferent: 0.014,
                material: {
                    transparent: true, displacementScale: 0.014,
                }
            },
            grid: {
                radiusDifferent: 0.015,
                detail: 8,
                material: {
                    transparent: true,
                    opacity: 0,
                    wireframe: true,
                }
            },
        }
    },
}