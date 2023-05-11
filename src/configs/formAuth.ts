import {IFormAuth, IInputError, InputErrorType} from "../types/user/authTypes";

export const inputs: { [key in InputErrorType]: IInputError } = {
    username: {
        property: {name: 'username', placeholder: 'логин'},
        validate: (form, errors = []) => {
            // @ts-ignore
            const username = form.namedItem(inputs.username.property.name).value
            if (username.length < 5 || username.length > 10) {
                errors.push('введите логин от 5 до 10 символов')
            }
            return errors
        },
    },
    email: {
        property: {name: 'email', placeholder: 'электронная почта', type: 'email'},
        validate: (form, errors = []) => {
            // @ts-ignore
            const email = form.namedItem(inputs.email.property.name).value
            if (email.length < 5 || email.length > 255) {
                errors.push('введите пароль от 5 до 255 символов')
            }

            return errors
        },
    },
    password: {
        property: {name: 'password', placeholder: 'пароль', type: 'password'},
        fieldsToTrackValidate: ['repeat_password'],
        validate: (form, errors = []) => {
            // @ts-ignore
            const password = form.namedItem(inputs.password.property.name).value
            if (password.length < 5 || password.length > 20) {
                errors.push('введите пароль от 5 до 20 символов')
            }

            return errors
        },
    },
    repeat_password: {
        property: {name: 'repeat_password', placeholder: 'повторите пароль', type: 'password'},
        validate: (form, errors = []) => {
            // @ts-ignore
            const repeat_password = form.namedItem(inputs.repeat_password.property.name).value
            // @ts-ignore
            const password = form.namedItem(inputs.password.property.name).value

            if (password !== repeat_password) {
                errors.push('повторите пароль')
            }
            return errors
        },
    },
}

export const forms: IFormAuth[] = [
    {
        title: 'Авторизация', class: 'sign',
        inputs: [inputs.username, inputs.password,],
        button: {text: 'Войти', request: {method: "POST"}},
        foot: {text: 'Нет аккаунта?', ref: 'registration', refText: 'Зарегистрироваться'}
    },
    {
        title: 'Регистрация', class: 'registration',
        inputs: [inputs.username, inputs.email, inputs.password, inputs.repeat_password],
        button: {text: 'Зарегистрироваться', request: {method: "POST"}},
        foot: {text: 'Уже зарегистрированы?', ref: 'sign', refText: 'Войти'}
    },

]