import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICurrentUser} from "../../types/user/userTypes";


interface IUserState {
    currentUser?: ICurrentUser
}

const initialState: IUserState = {}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<ICurrentUser>) {
            state.currentUser = action.payload
        },
    }
})

export const userDataReducer = userDataSlice.reducer


