import React, {FC, useEffect, useState} from "react";
import {Transition} from "react-transition-group";
import $ from "jquery";
import {IInputError, InputErrorType} from "../../../types/user/authTypes";

interface IErrorInput {
    input: IInputError
    formRef: React.RefObject<HTMLFormElement>
    errorsField: string[] | undefined
    fieldForValidate?: InputErrorType | null
    setFieldForValidate?: React.Dispatch<React.SetStateAction<InputErrorType | null>>
}

const ErrorInput: FC<IErrorInput> = ({
                                         input, formRef, errorsField,
                                         fieldForValidate, setFieldForValidate
                                     }) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [warning, setWarning] = useState<boolean>(false);

    useEffect(() => {
        errorsField && setErrors(errorsField)
        errorsField && setWarning(true)
    }, [errorsField]);

    useEffect(() => {
        !errors.length && setWarning(false)
    }, [errors]);

    // Отслеживание валидации
    useEffect(() => {
        if (fieldForValidate === input.property.name) {
            setErrors(input.validate!(formRef.current!.elements))
            setFieldForValidate!(null)
        }
    }, [fieldForValidate]);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        input.validate && formRef.current && setErrors(input.validate(formRef.current.elements))
        input.fieldsToTrackValidate && input.fieldsToTrackValidate.map(field => setFieldForValidate!(field))
    }

    return <div className='input'>
        {warning && <img className='warning' src={process.env.PUBLIC_URL + "/assets/images/warning.svg"} alt=""/>}
        <input onInput={handleInput} {...input.property}/>
        <Transition in={!!errors.length} timeout={200} mountOnEnter unmountOnExit
                    onEnter={(e: EventTarget) => $(e).hide().slideDown(300)}
                    onExit={e => $(e).show().slideUp(300)}>
            <div className='errors'>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </div>
        </Transition>
    </div>
}

export default ErrorInput;