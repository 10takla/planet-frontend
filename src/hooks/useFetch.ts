import {useCallback, useEffect, useState} from "react";
import {fetchCUD, fetchPlanetsData} from "../reducers/ActionCreator";
import {AllowModels, IFetch, IFetchAnyMethod} from "../types/fetch/fetchTypes";
import {useAppDispatch} from "./redux";
import {messagesStateSlice} from "../reducers/slices/app/MessagesStateSlice";

export const useFetchGet = <M extends AllowModels, RF>(dep: any[] = []) => {
    const dispatch = useAppDispatch()
    const [data, stData] = useState<RF | null>(null);
    const [isWaiting, setIsWaiting] = useState(false);

    const makeRequest = useCallback(async (fetchProps: IFetch<M>) => {
        setIsWaiting(true)
        fetchPlanetsData<RF, M>({...fetchProps})
            .then(data => {
                stData(data)
            })
            .catch(error => {
                const message = {text: error.statusText, isNotice: true}
                dispatch(messagesStateSlice.actions.setLogs([message]))
            })
            .finally(() => setIsWaiting(false))
    }, [dep])

    return [data, makeRequest, isWaiting] as [RF | null, (fetchProps: IFetch<M>) => void, boolean]
}

export const useFetchCRUDE = <T = object | null>(object: T | null, dep: any[] = []) => {
    const [updated, setUpdated] = useState(object);
    const [error, setError] = useState<Response | null>(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        setUpdated(object)
    }, [object])

    const makeUpdate = useCallback((fetchProps: IFetchAnyMethod) => {
        setIsWaiting(true)
        fetchCUD<T>({...fetchProps})
            .then(create => {
                setUpdated(create)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setIsWaiting(false)
            })
    }, [dep]);

    return [updated, makeUpdate, isWaiting, error] as [T | null, (action: IFetchAnyMethod) => void, boolean, Response  | null]
}

export const useFetchCreateDestroy = <T = object>(object: T | null, fetchProps: IFetch): [boolean, T | null, () => void, boolean] => {
    const [changed, setChanged] = useState(object);
    const [isExist, setIsExist] = useState(!!object);
    const [isWaiting, setIsWaiting] = useState(false);
    const [created, makeCreate, isWaitingCreate] = useFetchCRUDE<T>(changed)
    const [destroy, makeDestroy, isWaitingDestroy] = useFetchCRUDE<T>(changed)

    useEffect(() => {
        setIsExist(!!changed)
    }, [changed]);

    useEffect(() => {
        setIsWaiting(isWaitingCreate)
    }, [isWaitingCreate])
    useEffect(() => {
        setIsWaiting(isWaitingDestroy)
    }, [isWaitingDestroy])
    useEffect(() => {
        setChanged(created)
    }, [created])
    useEffect(() => {
        setChanged(destroy)
    }, [destroy])

    const makeChange = useCallback(() => {
        if (isExist) {
            makeDestroy({
                ...fetchProps,
                endpoint: fetchProps.endpoint,
                action: "delete"
            })
        } else {
            makeCreate({
                ...fetchProps,
                endpoint: fetchProps.endpoint,
                action: "delete"
            })
        }
    }, [isExist]);

    return [isExist, changed, makeChange, isWaiting]
}
