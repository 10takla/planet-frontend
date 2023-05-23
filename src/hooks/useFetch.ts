import {useEffect, useState} from "react";
import {fetchPlanetsData} from "../reducers/ActionCreator";
import {AllowModels, IFetch} from "../types/fetch/fetchTypes";
import {useAppDispatch} from "./redux";
import {messagesStateSlice} from "../reducers/slices/MessagesStateSlice";
import {requestURL} from "../helpers/requestApi";
import {IPlot} from "../types/store/threejs/planetObjectsTypes";
import {getCookie} from "../helpers/cookieApi";
import plot from "../components/store/threejs/Plots/Plot";
import {RequiredFields} from "../types/functionsTS";

interface IProps {
    endpoint: `${string}/`
    body: {},

}

export const useFetch = <M extends AllowModels, RF>(props: IFetch<M>, dep: any[] = []) => {
    const dispatch = useAppDispatch()

    const [data, stData] = useState<RF | null>(null);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        setIsWaiting(true)
        fetchPlanetsData<RF, M>({...props})
            .then(data => stData(data))
            .catch(error => {
                console.log(error)
                const message = {text: error.statusText, isNotice: true}
                dispatch(messagesStateSlice.actions.setLogs([message]))
            })
            .finally(() => setIsWaiting(false))
    }, dep)
    return [data, isWaiting] as [RF | null, boolean]
}

export const useUpdatePlots = (plotId: number, body: any): [any, boolean] => {
    const [isWaiting, setIsWaiting] = useState(false);
    const [update, setUpdate] = useState<IPlot | null>(null)

    useEffect(() => {
        if (body) {
            setIsWaiting(true)
            fetch(requestURL(`planets/plots/${plotId}/update/`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Token ${getCookie('token')}`,
                },
                body: JSON.stringify(body)
            })
                .then(response => {
                    setIsWaiting(false)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data: IPlot) => {
                    setUpdate(data)
                })
                .catch(error => {
                    setUpdate(body)
                })

        }
    }, [body])

    return [update, isWaiting]
}