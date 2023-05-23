export type RequiredFields<T, F extends keyof T> = Required<Pick<T, F>> & Omit<T, F>
