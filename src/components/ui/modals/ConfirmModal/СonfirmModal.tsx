import React, {FC, MouseEvent, useCallback} from 'react';
import './confirmModals.scss'


interface IConfirmModals {
    children: React.ReactNode
    message: string
    performFunction: () => void
    confirm: boolean
    setConfirm: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const ConfirmModals: FC<IConfirmModals> = ({performFunction, children, confirm, setConfirm, message}) => {
    const onAgreeClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        performFunction()
        setConfirm(false)
    }, []);

    const onDisagreeCLick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setConfirm(false)
    }, []);

    return (
        <React.Fragment>
            {confirm &&
                <div  className={'modal-back confirm'}>
                    <div className={'modal'}>
                        <span>{message}</span>
                        <div className={'actions'}>
                            <button onClick={onAgreeClick}>Да</button>
                            <button onClick={onDisagreeCLick}>Нет</button>
                        </div>
                    </div>
                </div>
            }
            {children}
        </React.Fragment>
    );
};

export default ConfirmModals;