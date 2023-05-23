import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthFormType} from "../../types/user/authTypes";
import {ModalType} from "../../types/user/modalTypes";

interface IAppState {
    activeAuthForm: AuthFormType | null
    visibleUserMenu: boolean
    activeModal: ModalType | null
    currency: 'dollar' | 'ruble'
}

const initialState: IAppState = {
    activeAuthForm: null,
    visibleUserMenu: false,
    activeModal: null,
    currency: "ruble",
}

export const appStateSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        setActiveForm(state, action: PayloadAction<AuthFormType | null>) {
            state.activeAuthForm = action.payload
        },
        setVisibleUserMenu(state, action: PayloadAction<boolean>) {
            state.visibleUserMenu = action.payload
        },
        setActiveModal(state, action: PayloadAction<ModalType | null>) {
            state.activeModal = action.payload
        },
    }
})

export const appStateReducer = appStateSlice.reducer


