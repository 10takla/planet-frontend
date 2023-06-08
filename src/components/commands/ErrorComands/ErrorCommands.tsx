import React, {FC, useMemo} from 'react';
import Command from "../ui/Command";
import {useAppDispatch} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/app/AppStateSlice";
import './errorCommands.scss'


interface IErrorCommands {
    response: any
}

enum codeEnum {
    UNAUTH = 401,
}

const ErrorCommands: FC<IErrorCommands> = ({response}) => {
    const dispatch = useAppDispatch()

    const commands = {
        [codeEnum.UNAUTH]: {
            description: 'Вы не авторизованы.',
            text: 'Авторизоваться',
            command: () => dispatch(appStateSlice.actions.setActiveForm('sign'))
        }
    }

    const data = useMemo(() => {
        if (response.status === codeEnum.UNAUTH) {
            return <>Вы не авторизованы. <Command {...commands[codeEnum.UNAUTH]}/></>
        }

        return response
    }, [response]);

    // @ts-ignore
    return (
        <span className={'error-command'}>
            {data}
        </span>
    );
};

export default ErrorCommands;