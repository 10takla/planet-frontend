import {MutableRefObject} from "react";

export interface IRef {
    ref?: MutableRefObject<any>
}

export type setRef<T> = { [K in keyof T]: T[K] & IRef }