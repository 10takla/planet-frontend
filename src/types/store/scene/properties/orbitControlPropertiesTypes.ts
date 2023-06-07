import {MouseEvent} from "react";
import {OrbitControlsProps} from "@react-three/drei";

export interface IOrbitControl {
    rotateSpeed?: {
        [key in MouseEvent<HTMLDivElement>["button"]]: number
    },
    actions?: {
        ranges: Record<'cameraRotation', number>
    },
    control?: OrbitControlsProps
}
