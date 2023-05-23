import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "../../types/user/messagesType";
import {RequiredFields} from "../../types/functionsTS";

interface IMessagesState {
    logs: RequiredFields<IMessage, 'id'>[]
}

const initialState: IMessagesState = {
    logs: [],
}

export const messagesStateSlice = createSlice({
    name: 'messagesData',
    initialState,
    reducers: {
        setLogs(state, action: PayloadAction<IMessage[]>) {
            const listId = state.logs.map(log => log.id)
            const messages = action.payload.map((message, i) => ({...message, id: Math.max(...listId) + 1}))
            state.logs = [...state.logs, ...messages]
        },
        clearNotices(state, action: PayloadAction<IMessage["id"][]>) {
            state.logs = state.logs.map(log => action.payload.includes(log.id) ? {...log, isNotice: false} : log)
        },
        clearLogs(state, action: PayloadAction<IMessage["id"][]>) {
            state.logs = state.logs.filter(message => !action.payload.includes(message.id))

        },
    }
})

export const messageStateReducer = messagesStateSlice.reducer


