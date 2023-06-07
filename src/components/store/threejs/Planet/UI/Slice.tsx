import React, {FC, MutableRefObject, useMemo} from 'react';
import {useAppSelector} from "../../../../../hooks/redux";
import {useTexture} from "@react-three/drei";
import {IPlanetProperties, PlanetSliceType} from "../../../../../types/store/scene/properties/planetPropertiesTypes";
import {IPlanet, ResolutionType} from "../../../../../types/entities/planetType";
import {IActionsScene} from "../../../../../types/store/scene/actionsTypes";
import {ASSETS_URL} from "../../../../../config";

interface IMesh {
    sliceType: PlanetSliceType
    isHasTextures?: boolean
    isHasDefaultTextures?: boolean
    planet: IPlanet
    actions: IActionsScene['planet']
    slice: any
    planetProps: any
}

const Slice: FC<IMesh> =
    ({planet, sliceType, actions, planetProps, slice, isHasTextures = true,}) => {
        const texturesPaths = useMemo(() => {
            if (sliceType === "grid") return {}
            const slices = planet?.textures?.[sliceType]

            let end_data: object = {}
            const baseRes: ResolutionType[] = ['2K', '4K']

            if (slices?.[actions.resolution]) {
                const index = baseRes.findIndex(res => res === actions.resolution)
                const clipRes = baseRes.slice(0, index + 1)
                clipRes.reverse().forEach(t => {
                    const tmp = slices?.[t]
                    Object.entries(tmp).forEach(([key, value]) => {
                        if (!Object.keys(end_data).includes(key)) {
                            if (tmp) {
                                console.log(ASSETS_URL, value)
                                end_data = {...end_data, [key]: ASSETS_URL + value}
                            }
                        }
                    })
                })
                return end_data
            } else {
                return slice.defaultTextures ?? {}
            }
        }, [planet, actions.resolution]);

        const textures = useTexture({...texturesPaths} as { [key in string]: string })

        return (
            <mesh ref={slice.ref}>
                {actions.isShadow ?
                    <meshPhongMaterial ref={slice.material?.ref} {...slice.material ?? {}} {...textures}/>
                    : <meshBasicMaterial ref={slice.material?.ref} {...slice.material ?? {}} {...textures}/>
                }
                <icosahedronGeometry args={[1 + slice.radiusDifferent, slice.detail ?? planetProps.detail]}/>
            </mesh>
        );
    }


export default Slice;