import {IPlanet} from "../../types/store/threejs/planetObjectsTypes";
import {AppDispatch} from "../../reducers/store";

export function checkSoreFields(fields: string[], storage: any[], activeId: number): [number | null, string[]] {
    const index = storage.findIndex(item => item.id === activeId)
    if (index !== -1) {
        const notExistFields = fields.filter(field => !storage[index].hasOwnProperty(field))
        if (notExistFields.length) {
            return [index, notExistFields]
        } else {
            return [index, []]
        }
    } else {
        return [null, fields]
    }
}


export const getPlanetData = (dispatch: AppDispatch, fields: string[], storage: IPlanet[], activeId: number) => {
    const [index, fieldsCheck] = checkSoreFields(fields, storage, activeId)
    console.log(index, fieldsCheck)
    if (!fieldsCheck.length && typeof index === "number") {
        // dispatch(planetStateSlice.actions.setActivePlanet(storage[index]))
    } else {
        // fetchPlanetsData(`planets/${activeId}/`, false, [["fields", fieldsCheck]])
        //     .then((planet: IPlanet) => {
        //         console.log(planet)
        //         // dispatch(planetStateSlice.actions.setActivePlanet(planet))
        //         dispatch(planetStateSlice.actions.setPlanets(planet))
        //     })
    }
}