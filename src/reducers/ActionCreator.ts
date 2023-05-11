import {AppDispatch} from "./store";
import {requestURL} from "../helpers/requestApi";
import {AuthDataType, AuthType, IRequest} from "../types/user/authTypes";
import {userDataSlice} from "./slices/UserDataSlice";
import {IPlanet, IPlot} from "../types/store/threejs/planetObjectsTypes";
import {getCookie} from "../helpers/cookieApi";

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

export const fetchPlanetsData = (endpoint: string, token?: boolean, body?: [string, any][]) => {
    const getBody = body?.map(([key, value]) => {
        const v = Array.isArray(value) ? value.join(',') : value
        return `${key}=${v}`
    }).join('&')

    return new Promise<IPlot & IPlot[] & IPlanet & IPlanet[]>((resolve, reject) => {
        fetch(
            requestURL(`${token ? 'user/me/' : ''}${endpoint}?${getBody}`), {
                headers: {
                    'Content-type': 'application/json',
                    // "Authorization": `Token ${token ? getCookie('token') : null}`,
                },
                method: "GET",
            }
        )
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.log(error))
    })
}



