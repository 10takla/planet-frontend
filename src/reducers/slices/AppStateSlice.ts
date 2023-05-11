import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthFormType} from "../../types/user/authTypes";
import {ModalType} from "../../types/user/modalTypes";

interface IAppState {
    activeAuthForm: AuthFormType | null
    visibleUserMenu: boolean
    authState: { isAuth: boolean, token?: string | null }
    activeModal: ModalType | null
}

const initialState: IAppState = {
    activeAuthForm: null,
    visibleUserMenu: false,
    authState: {isAuth: false, token: null},
    activeModal: null
}

export const appStateSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        setActiveForm(state, action: PayloadAction<AuthFormType | null>) {
            state.activeAuthForm = action.payload
        },
        setVisibleUserMenu(state, action: PayloadAction<boolean>){
            state.visibleUserMenu = action.payload
        },
        setAuthState(state, action: PayloadAction<IAppState['authState']>) {
            if (action.payload.isAuth) {
                document.cookie = `token=${action.payload.token}`;
                state.authState.token = action.payload.token
            } else {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                state.authState.token = null
            }
            state.authState.isAuth = action.payload.isAuth
        },
        setActiveModal(state, action: PayloadAction<ModalType | null>) {
            state.activeModal = action.payload
        },
    }
})

export const appStateReducer = appStateSlice.reducer


