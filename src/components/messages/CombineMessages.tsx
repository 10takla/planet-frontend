import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AnimationByCss from "../ui/animations/AnimationByCss";
import {IMessage} from "../../types/user/messagesType";
import MessagesList from "./ui/MessagesList";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {messagesStateSlice, messageStateReducer} from "../../reducers/slices/MessagesStateSlice";
import {ASSETS_URL} from "../../config";


const CombineMessages = () => {
    const dispatch = useAppDispatch()
    const [visibleLogs, setVisibleLogs] = useState(false);
    const {logs} = useAppSelector(state => state.messageStateReducer)
    const notices = useMemo(() => {
        return !visibleLogs ? logs.filter(log => log.isNotice) : []
    }, [logs, visibleLogs]);

    const clearLogs = useCallback((messages: IMessage[]) => {
        dispatch(messagesStateSlice.actions.clearLogs(messages.map(m => m.id)))
    }, [])

    const clearNotices = useCallback((messages: IMessage[]) => {
        dispatch(messagesStateSlice.actions.clearNotices(messages.map(m => m.id)))
    }, [])

    useEffect(() => {
        visibleLogs && clearNotices(logs)
    }, [visibleLogs]);

    const [value, setValue] = useState('');

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }, [])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const message = {id: logs.length + 1, text: value, lifetime: null, isNotice: true}
            dispatch(messagesStateSlice.actions.setLogs([message]))
            setValue('')
        }
    }, [value])

    return (
        <div className="all-messages">
            {/*<input value={value} onChange={handleChange} onKeyDown={handleKeyDown}/>*/}
            <div className={"notices"}>
                <MessagesList messages={notices} clearMessages={clearNotices} lifetime={4000}/>
            </div>
            <AnimationByCss in={visibleLogs} timeout="--animation-messages-duration" classNames="logs-block">
                <div className="logs">
                    <img className={visibleLogs ? 'active' : ''} onClick={() => setVisibleLogs(!visibleLogs)}
                         src={ASSETS_URL + "/images/arrow.svg"}/>
                    <div className={"messages-block"}>
                        {logs.length ?
                            <MessagesList messages={logs} clearMessages={clearLogs}/>
                            :
                            <span className={'lack_of'}>Нет уведомлений</span>
                        }
                    </div>
                </div>
            </AnimationByCss>
        </div>
    );
};

export default CombineMessages;