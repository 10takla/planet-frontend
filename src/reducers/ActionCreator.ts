import {AppDispatch} from "./store";
import {requestURL} from "../helpers/requestApi";
import {AuthDataType, AuthType, IRequest} from "../types/user/authTypes";
import {userDataSlice} from "./slices/UserDataSlice";
import {getCookie} from "../helpers/cookieApi";
import {AllowModels, IFetch} from "../types/fetch/fetchTypes";

export const fetchAuthUser = (dispatch: AppDispatch, typeOperation: AuthType, data: { [key in AuthDataType]?: string }, request: IRequest) => {
    return new Promise((resolve, rejects) =>
        fetch(requestURL(`user/${typeOperation}/`), {
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Token ${request.token}`,
            },
            method: request.method,
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    response.json().then(data => rejects(data))
                }
                response.json().then(data => {
                    if (!data.token) {
                        rejects({message: ['Авторизация не прошла. Попробуйте позже']})
                    }
                    resolve(data)
                })
            })
            .catch(error => {
                rejects({message: ['Нет связи с сервером']})
            })
    )
}

export const fetchUserData = (dispatch: AppDispatch, token: string) => {
    fetch(
        requestURL('user/me/'), {
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Token ${token}`,
            },
            method: "GET",
        }
    )
        .then(response => response.json())
        .then(data => dispatch(userDataSlice.actions.setCurrentUser(data)))
        .catch(error => console.log(error))
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


export const fetchUpdate = <T>(plotId: any, body: any) => {
    return new Promise<T>((resolve, reject) => {
        fetch(requestURL(`planets/plots/${plotId}/update/`), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${getCookie('token')}`,
            },
            body: JSON.stringify(body)
        })
            .then(response => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: T) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            });
    })
}

