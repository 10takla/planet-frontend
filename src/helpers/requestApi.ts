import {SERVER_HOSTS} from "../config";


export const requestURL = (endpoint: string) => {
    return [SERVER_HOSTS, endpoint].join('/')
}