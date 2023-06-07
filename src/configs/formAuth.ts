import {IFormAuth, IInputError, InputErrorType} from "../types/user/authTypes";

export const inputs = [
    {
        property: {name: 'telegramName', placeholder: 'телеграм аккаунт'},
        validate: {
            isErr: (form: any, name: InputErrorType) => {
                const filedValue = form.namedItem(name).value
                return (filedValue.length > 255)
            },
            errorMessage: 'максимум 255 символов'
        },
    },
    {
        property: {name: 'status', placeholder: 'статус'},
        isTextArea: true,
        validate: {
            isErr: (form: any, name: InputErrorType) => {
                const filedValue = form.namedItem(name).value
                return (filedValue.length > 255)
            },
            errorMessage: 'максимум 255 символов'
        },

    },
    {
        property: {name: 'username', placeholder: 'логин'},
        validate: {
            isErr: (form: any, name: InputErrorType) => {
                const username = form.namedItem(name).value
                return (username.length < 5 || username.length > 10)
            },
            errorMessage: 'введите логин от 5 до 10 символов'
        }
    },
    {
        property: {name: 'email', placeholder: 'электронная почта', type: 'email'},
        validate: {
            isErr: (form: any, name: InputErrorType) => {
                const email = form.namedItem(name).value
                return (email.length < 5 || email.length > 255)
            },
            errorMessage: 'введите пароль от 5 до 255 символов'
        }
    },

    {
        property: {name: 'password', placeholder: 'пароль', type: 'password'},
        fieldsToTrackValidate: ['repeat_password'],
        validate: {
            isErr: (form: any, name: InputErrorType) => {
                const password = form.namedItem(name).value
                return (password.length < 5 || password.length > 20)
            },
            errorMessage: 'введите пароль от 5 до 20 символов'
        }
    },
    {
        property: {name: 'repeat_password', placeholder: 'повторите пароль', type: 'password'},
        validate: {
            isErr: (form: any, name: InputErrorType) => {
                const repeat_password = form.namedItem('password').value
                const password = form.namedItem(name).value
                return (password !== repeat_password)
            },
            errorMessage: 'пароль должен повторяться'
        }
    },
].reduce((accum, curr) => {
    return {
        ...accum, [curr.property.name]:
            (isRequired = false, value = '') => {
                return {
                    ...curr,
                    value: value,
                    validate: (form: any, name: InputErrorType, errors: string[] = []) => {
                        // @ts-ignore
                        let isErr = curr.validate.isErr(form, name)
                        const username = form.namedItem(name).value
                        if (!isRequired && username === '') {
                            isErr = false
                        }
                        isErr && errors.push(curr.validate.errorMessage)
                        return errors
                    }
                }
            }
    }
}, {} as { [key in InputErrorType]: (isRequired?: boolean, value?: string) => IInputError })

export const forms: IFormAuth[] = [
    {
        title: 'Авторизация', class: 'sign',
        inputs: [inputs.username(true), inputs.password(true),],
        button: {text: 'Войти', request: {method: "POST"}},
        foot: {text: 'Нет аккаунта?', ref: 'registration', refText: 'Зарегистрироваться'}
    },
    {
        title: 'Регистрация', class: 'registration',
        inputs: [inputs.username(true), inputs.email(true), inputs.password(true), inputs.repeat_password(true)],
        button: {text: 'Зарегистрироваться', request: {method: "POST"}},
        foot: {text: 'Уже зарегистрированы?', ref: 'sign', refText: 'Войти'}
    },
]
