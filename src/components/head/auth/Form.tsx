import React, {FC, useEffect, useRef, useState} from 'react';
import {appStateSlice} from "../../../reducers/slices/app/AppStateSlice";
import ErrorInput from "../../ui/errors/ErrorInput";
import {IFormAuth, InputErrorType} from "../../../types/user/authTypes";
import {useAppDispatch} from "../../../hooks/redux";
import {fetchAuthUser} from "../../../reducers/ActionCreator";
import {ASSETS_URL} from "../../../config";
import {userDataSlice} from "../../../reducers/slices/UserDataSlice";


interface IForm {
    form: IFormAuth
}

const Form: FC<IForm> = ({form}) => {
    const dispatch = useAppDispatch()
    const formRef = useRef<HTMLFormElement>(null);

    const [errorsFields, setErrorsFields] = useState<{ [key in InputErrorType]?: string[] }>({});

    const validationForm = () => {
        let tmp: typeof errorsFields = {}
        let arr = []

        form.inputs.forEach(input => {
            const i = input.validate(formRef.current!.elements, input.property.name)
            if (i.length) {
                tmp[input.property.name] = i
                arr.push(input.property.name)
            }
        })

        setErrorsFields(tmp)
        return !arr.length
    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validationForm()) {
            const formData = new FormData(e.target as HTMLFormElement); // e.target - ваш HTML-элемент формы
            // @ts-ignore
            const data = Object.fromEntries([...formData.entries()].reduce((acc, [key, value]) => {
                if (value !== '') {
                    acc.push([key, value]);
                }
                return acc;
            }, []));

            fetchAuthUser(form.class,
                data,
                form.button.request
            )
                .then((data: any) => {
                    if (form.button.request.method === "PATCH") {
                        dispatch(userDataSlice.actions.updateAuthUser(data))
                    } else {
                        dispatch(userDataSlice.actions.setAuthUser(data))
                    }

                })
                .catch(error => {
                    setErrorsFields(error)
                })
        }
    }

    // Отслеживание валидации по связанным полям
    const [fieldForValidate, setFieldForValidate] = useState<InputErrorType | null>(null);

    return (
        <form ref={formRef} onSubmit={handleForm}
              className={['form', form.class].join(' ')}>
            {form.title && <h2 className='title'>{form.title}</h2>}
            {form.foot && <img className='close' src={ASSETS_URL + "/images/close.svg"}
                               onClick={e => dispatch(appStateSlice.actions.setActiveForm(null))}/>}
            {form.inputs.map(input =>
                <ErrorInput key={input.property.name}
                            input={input}
                            formRef={formRef}
                            errorsField={errorsFields[input.property.name]}
                            fieldForValidate={fieldForValidate}
                            setFieldForValidate={setFieldForValidate}
                />
            )}
            <div className='button'>
                <button>{form.button.text}</button>
                <div className='errors'>
                    {/*@ts-ignore*/}
                    {errorsFields.message && errorsFields.message.map((error, i) =>
                        <li key={i}>{error}</li>
                    )}
                </div>
            </div>
            {form.foot &&
                <p className='foot'>{form.foot!.text}
                    <a onClick={e => dispatch(appStateSlice.actions.setActiveForm(form.foot!.ref))}>
                        {form.foot!.refText}
                    </a>
                </p>}
        </form>
    );
};

export default Form;