import {ColorRepresentation, HexColorString} from "three/src/utils";
import * as THREE from "three";
import {IPlot} from "../../types/store/threejs/planetObjectsTypes";
import Delaunator from 'delaunator';
import {ConvexGeometry} from "three/examples/jsm/geometries/ConvexGeometry";
import {CSSProperties} from "react";


export function getAnyColor(hexColor: HexColorString, angleOffset = 30,
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
    const [x, y, z] = center;
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

export function geometryToBuffer(geometry: IPlot["mesh"], scale = 1) {
    const buffer = new THREE.BufferGeometry();
    const vertices = geometry!.vertices
    const faces = geometry!.faces.flat()
    const center = geometry!.center

    buffer.setAttribute('position', new THREE.Float32BufferAttribute(vertices.flat(), 3));
    buffer.setIndex(geometry!.vertices.map((_, i) => i));
    buffer.translate(center![0], center![1], center![2]);

    let polyShape = new THREE.Shape(geometry!.vertices.map((coord) => new THREE.Vector2(coord[1], coord[2])))
    const polyGeometry = new THREE.ShapeGeometry(polyShape);

    polyGeometry.setAttribute("position", new THREE.Float32BufferAttribute(geometry!.vertices.map(coord => [coord[0], coord[1], coord[2]]).flat(), 3))

    polyGeometry.computeBoundingBox()
    const cen = polyGeometry.boundingBox!.getCenter(new THREE.Vector3())

    polyGeometry.lookAt(new THREE.Vector3(cen.x, 1, cen.z))

    const delaunay = new Delaunator(vertices.map(o => [o[0], o[1]]).flat());
    const tmp = vertices.map((o, i) =>
        [delaunay.coords[i * 2], delaunay.coords[i * 2 + 1], o[2]]
    )


    polyGeometry.setAttribute("position", new THREE.Float32BufferAttribute(tmp.flat(), 3))
    const geo = new ConvexGeometry(geometry!.vertices.map(v => new THREE.Vector3(...v)))

    return changeSphericalScale(polyGeometry, scale, center)
}

