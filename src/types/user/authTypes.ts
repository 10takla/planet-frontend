import React from "react";

export type AuthType = AuthFormType | 'authenticate'

export type AuthDataType = InputErrorType | 'token'

export type AuthFormType = 'sign' | 'registration' | 'update'

export type InputErrorType = 'username' | 'email' | 'password' | 'repeat_password' | 'status' | 'telegramName' | 'logo'

export interface IInputError {
    property: {
        name: InputErrorType; placeholder?: string,
        type?: React.HTMLInputTypeAttribute
    },
    value: string
    isTextArea?: boolean
    validate: (form: HTMLFormElement['elements'], name: InputErrorType, errors?: string[]) => string[]
    fieldsToTrackValidate?: InputErrorType[]
}


export interface IRequest {
    token?: string
    method: "GET" | "PATCH" | "POST"
    pk?: string
}

export interface IFormAuth {
    title?: string
    class: AuthFormType
    inputs: IInputError[]
    button: { text: string, request: IRequest }
    foot?: {
        text?: string,
        ref: AuthFormType,
        refText?: string
    }
}