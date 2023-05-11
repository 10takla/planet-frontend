import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "../../types/user/messagesType";

interface IMessagesState {
    messages: IMessage[]
}

const initialState: IMessagesState = {
    messages: []
}

export const messagesStateSlice = createSlice({
    name: 'messagesData',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<IMessage[]>) {
            state.messages = [...state.messages, ...action.payload]
        },
        deleteMessages(state, action: PayloadAction<IMessage['id'][]>) {
            console.log(action.payload)
            state.messages = state.messages.filter(message => !action.payload.includes(message.id))
        },
    }
})

export const messageStateReducer = messagesStateSlice.reducer


