import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthUser, IUser} from "../../types/user/userTypes";


interface IUserState {
    authUser: IAuthUser | null
    focusUserId: IUser['id'] | null
}

const initialState: IUserState = {
    authUser: null,
    focusUserId: null
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        updateAuthUser(state, action: PayloadAction<{ [K in keyof IAuthUser]?: IAuthUser[K] }>) {
            // @ts-ignore
            state.authUser = {...state.authUser, ...action.payload}
        },
        setAuthUser(state, action: PayloadAction<IAuthUser | null>) {
            if (action.payload) {
                document.cookie = `token=${action.payload.token}`;
            } else {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            state.authUser = action.payload
        },
        setFocusUserId(state, action: PayloadAction<IUser['id'] | null>) {
            state.focusUserId = action.payload
        },
    }
})

export const userDataReducer = userDataSlice.reducer


