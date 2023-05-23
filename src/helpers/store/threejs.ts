import {HexColorString} from "three/src/utils";
import * as THREE from "three";
import {BufferGeometry} from "three";
import {IPlot, IPlotForStore} from "../../types/store/threejs/planetObjectsTypes";
import {CSSProperties} from "react";

export function getAnyColor(hexColor: CSSProperties["color"], angleOffset = 0,
                            saturation?: number, alpha?: number): CSSProperties["color"] {
    const convert = require('color-convert');
    const hsv = convert.hex.hsv(hexColor);

    hsv[0] = (hsv[0] + angleOffset) % 360
    hsv[1] = saturation ?? hsv[1]

    return '#' + convert.hsv.hex(hsv)
}

export function getContrastColor(hexColor: HexColorString): HexColorString {
    // Извлечь значения красного, зеленого и синего цветов из hex-кода
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);

    // Вычислить противоположный цвет
    const oppositeRed = 255 - red;
    const oppositeGreen = 255 - green;
    const oppositeBlue = 255 - blue;

    // Собрать противоположный цвет в формате #RRGGBB
    const oppositeHex = "#" +
        oppositeRed.toString(16).padStart(2, "0") +
        oppositeGreen.toString(16).padStart(2, "0") +
        oppositeBlue.toString(16).padStart(2, "0");

    return oppositeHex as HexColorString;
}

export function changeSphericalScale(buffer: THREE.BufferGeometry, scale: number, center: any) {
    //меняем размер
    buffer.computeBoundingBox()
    const {x, y, z}= buffer.boundingBox!.getCenter(new THREE.Vector3());
    buffer.computeBoundingSphere()
    const matrix = new THREE.Matrix4().makeTranslation(-x, -y, -z)
        .premultiply(new THREE.Matrix4().makeScale(scale, scale, scale))
        .premultiply(new THREE.Matrix4().makeTranslation(x, y, z));
    buffer.applyMatrix4(matrix);

    //нормализуем
    const positionAttribute = buffer.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i <= positionAttribute.count; i++) {
        const vertex = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
        vertex.normalize();
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    return buffer
}

export function geometryToBuffer(geometry: IPlotForStore["mesh"], scale = 1, numRandomVertices = 0) {
    let buffer = new THREE.BufferGeometry();
    const vertices = geometry.vertices;
    const faces = geometry.faces;
    const center = geometry.center;

    buffer.setAttribute('position', new THREE.Float32BufferAttribute(vertices.flat(), 3));
    buffer.setIndex(faces.flat());

    buffer = changeSphericalScale(buffer, scale, center)

    return buffer;
}

function generateRandomVertices(buffer: BufferGeometry, geometry: IPlot["mesh"]) {
    const vertices = geometry!.vertices.map(o => ({x: o[0], y: o[1], z: o[2]}))
    const c = geometry!.center
    const center = {x: c[0], y: c[1], z: c[2]}

    // Генерируем случайные точки внутри ограничивающего параллелепипеда
    const randomVertices = []
    for (let i = 0; i < vertices.length; i++) {
        const rangeX = Math.abs(center.x - vertices[i].x)
        const rangeY = Math.abs(center.y - vertices[i].y)
        const rangeZ = Math.abs(center.z - vertices[i].z)
        const randomVertex = new THREE.Vector3(
            center.x + (Math.random() - 0.5) * rangeX,
            center.y + (Math.random() - 0.5) * rangeY,
            center.z + (Math.random() - 0.5) * rangeZ
        );
        randomVertices.push(randomVertex)
    }


    return [...vertices, ...randomVertices.map(v=> v.normalize())].map(v => [v.x, v.y, v.z])
}
