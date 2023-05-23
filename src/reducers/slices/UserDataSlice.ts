import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICurrentUser, IUser} from "../../types/user/userTypes";


interface IUserState {
    currentUser?: ICurrentUser
    authState: { isAuth: boolean, token?: string | null }
    focusUserId: IUser['id'] | null
}

const initialState: IUserState = {
    authState: {isAuth: false, token: null},
    focusUserId: null
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setAuthState(state, action: PayloadAction<IUserState['authState']>) {
            if (action.payload.isAuth) {
                document.cookie = `token=${action.payload.token}`;
                state.authState.token = action.payload.token
            } else {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                state.authState.token = null
            }
            state.authState.isAuth = action.payload.isAuth
        },
        setCurrentUser(state, action: PayloadAction<ICurrentUser>) {
            state.currentUser = action.payload
        },
        setFocusUserId(state, action: PayloadAction<IUser['id'] | null>) {
            state.focusUserId = action.payload
        },
    }
})

export const userDataReducer = userDataSlice.reducer


