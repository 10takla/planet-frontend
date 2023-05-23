import React, {FC, useMemo} from 'react';
import Command from "./ui/Command";
import {useAppDispatch} from "../../hooks/redux";
import {appStateSlice} from "../../reducers/slices/AppStateSlice";

interface IErrorCommands {
    statusCode: Response["status"]
}

enum codeEnum {
    UNAUTH = 401,
}

const ErrorCommands: FC<IErrorCommands> = ({statusCode}) => {
    const dispatch = useAppDispatch()

    const commands = {
        [codeEnum.UNAUTH]: {
            text: 'Авторизоваться',
            command: () => dispatch(appStateSlice.actions.setActiveForm('sign'))
        }
    }

    const data = useMemo(() => {
        if (statusCode === codeEnum.UNAUTH) {
            return <Command {...commands[codeEnum.UNAUTH]}/>
        }
        return statusCode
    }, []);

    return (
        <div>
            {data}
        </div>
    );
};

export default ErrorCommands;