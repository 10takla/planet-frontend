import {AppDispatch} from "./store";
import {requestURL} from "../helpers/requestApi";
import {AuthDataType, AuthType, IRequest} from "../types/user/authTypes";
import {getCookie} from "../helpers/cookieApi";
import {AllowModels, FetchMethodEnum, IFetch, IFetchAnyMethod} from "../types/fetch/fetchTypes";

export const fetchAuthUser = (typeOperation: AuthType, data: { [key in AuthDataType]?: string }, request: IRequest) => {
    return new Promise((resolve, rejects) =>
        fetch(requestURL(`user/${typeOperation}/`), {
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Token ${getCookie('token')}`,
            },
            method: request.method,
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    response.json().then(data => rejects(data))
                } else {
                    response.json().then(data => {
                        resolve(data)
                    })
                }
                // response.json().then(data => {
                //     if (!data.token) {
                //         rejects({message: ['Авторизация не прошла. Попробуйте позже']})
                //     }
                //     resolve(data)
                // })
            })
            .catch(error => {
                rejects({message: ['Нет связи с сервером']})
            })
    )
}

export const fetchMediaData = (dispatch?: AppDispatch) => {
    return new Promise<string[]>((resolve, reject) => {
        fetch(requestURL('media/images/user_icons/'))
            .then(response => response.json())
            .then((data) => resolve(data.images))
            .catch(error => reject(error))
    })
}

export const fetchPlanetsData = <R, M extends AllowModels>({endpoint, isToken = false, body}: IFetch<M>) => {
    const getBody = body && Object.entries(body).map(([key, value]) =>
        key + '=' + (Array.isArray(value) ? value.join(',') : value)
    ).join('&')

    const headers: HeadersInit = isToken ? {
        "Authorization": `Token ${getCookie('token')}`,
    } : {}

    return new Promise<R>((resolve, reject) => {
        fetch(
            requestURL(endpoint + (getBody ? `?${getBody}` : '')), {
                headers: {
                    ...headers,
                    'Content-type': 'application/json',
                },
                method: "GET",
            }
        )
            .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else throw response;
                }
            )
            .then((data: R) => {
                    resolve(data)
                }
            )
            .catch(error => reject(error))
    })
}

export const fetchCUD = <T = object>({endpoint, body, action}: IFetchAnyMethod) => {
    const getBody = body && Object.entries(body).map(([key, value]) =>
        key + '=' + (Array.isArray(value) ? value.join(',') : value)
    ).join('&')

    return new Promise<T>((resolve, reject) => {
        fetch(requestURL(`user/me/${endpoint}${action}/?` + getBody), {
            method: FetchMethodEnum[action],
            headers: {
                "Authorization": `Token ${getCookie('token')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(String(response.status));
                }
                if (action === 'delete'){
                    return null
                }
                return response.json();
            })
            .then((data) => {
                resolve(data)
            })
            .catch((error: Error) => {
                reject(error.message)
            })
    })
}

