import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthFormType} from "../../../types/user/authTypes";
import {ModalType} from "../../../types/user/modalTypes";
import {CurrencyType} from "../../../types/app/appTypes";

interface IAppState {
    activeAuthForm: AuthFormType | null
    visibleUserMenu: boolean
    activeModal: ModalType | null
    currency: CurrencyType
    areaUnit: string
    events: {
        isProcessAuth: boolean
    }
}

const initialState: IAppState = {
    activeAuthForm: null,
    visibleUserMenu: false,
    activeModal: null,
    currency: "point",
    areaUnit: 'км²',
    events: {
        isProcessAuth: false
    }
}

export const appStateSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        setEvent(state, action: PayloadAction<{ [K in keyof IAppState['events']]: IAppState['events'][K] }>) {
            state.events = {...state.events, ...action.payload}
        },
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


