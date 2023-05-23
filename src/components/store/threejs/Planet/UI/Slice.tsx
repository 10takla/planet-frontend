import React, {FC, MutableRefObject, useMemo} from 'react';
import {
    IPlanet, IPlanetProperties, ISlice,
    ITexture,
    PlanetSliceType,
    ResolutionType,
    TextureType
} from "../../../../../types/store/threejs/planetObjectsTypes";
import {useAppSelector} from "../../../../../hooks/redux";
import {useTexture} from "@react-three/drei";
import * as THREE from "three"

interface IMesh extends IPlanetProperties {
    sliceType: PlanetSliceType
    isHasTextures?: boolean
    isHasDefaultTextures?: boolean
    planet: IPlanet
}

const Slice: FC<IMesh> =
    ({planet, sliceType, isHasTextures = true, ...props}) => {
        const {resolution} = props.actions.selectors
        const {isShadow} = props.actions.buttons
        const slice = props.slices[sliceType]!

        const texturesPaths = useMemo(() => {
            if (sliceType === "grid") return {}
            const slices = planet?.textures?.[sliceType]

            let end_data: object = {}
            const baseRes: ResolutionType[] = ['2K', '4K']

            if (slices?.[resolution]) {
                const index = baseRes.findIndex(res => res === resolution)
                const clipRes = baseRes.slice(0, index + 1)
                clipRes.reverse().forEach(t => {
                    const tmp = slices?.[t]
                    Object.entries(tmp).forEach(([key, value]) => {
                        if (!Object.keys(end_data).includes(key)) {
                            if (tmp) {
                                end_data = {...end_data, [key]: value}
                            }
                        }
                    })
                })
                return end_data
            } else {
                return slice.defaultTextures ?? {}
            }
        }, [planet, resolution]);

        const textures = useTexture({...texturesPaths} as { [key in string]: string })
        return (
            <mesh ref={props.slices[sliceType]?.ref}>
                {isShadow ? <meshPhongMaterial ref={props.slices[sliceType]?.material?.ref}
                                               {...slice.material ?? {}} {...textures}/>
                    : <meshBasicMaterial ref={props.slices[sliceType]?.material?.ref}
                                         {...slice.material ?? {}} {...textures}/>}
                <icosahedronGeometry args={[1 + slice.radiusDifferent, slice.detail ?? props.detail]}/>
            </mesh>
        );
    }


export default Slice;