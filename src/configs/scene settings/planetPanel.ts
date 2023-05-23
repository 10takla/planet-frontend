import {ISceneProperties} from "../../types/store/threejs/sceneTypes";

export const planetPanelSettings: ISceneProperties = {
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
