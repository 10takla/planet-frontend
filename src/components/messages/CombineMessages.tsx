import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AnimationByCss from "../ui/animations/AnimationByCss";
import {IMessage} from "../../types/user/messagesType";
import MessagesList from "./ui/MessagesList";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {messagesStateSlice, messageStateReducer} from "../../reducers/slices/app/MessagesStateSlice";
import {ASSETS_URL} from "../../config";
import {isUndefined} from "util";


const CombineMessages = () => {
    const dispatch = useAppDispatch()
    const [visibleLogs, setVisibleLogs] = useState(false);
    const logs = useAppSelector(state => [...state.messageStateReducer.logs].reverse())
    const notices = useMemo(() => {
        return !visibleLogs ? logs.filter(log => log.isNotice).map(log => ({...log, date: undefined})) : []
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

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            //@ts-ignore
            const message = {text: e.target.value, lifetime: null, isNotice: true, date: new Date().toLocaleDateString()}
            dispatch(messagesStateSlice.actions.setLogs([message]))
        }
    }, [])


    return (
        <div className="messages-back">
            {/*<input  onKeyDown={handleKeyDown}/>*/}
            <div className={"notices"}>
                <div className={'messages-block'}>
                    <MessagesList messages={notices} clearMessages={clearNotices} lifetime={4000}/>
                </div>
            </div>
            <AnimationByCss in={visibleLogs} timeout="--animation-messages-duration" classNames="logs-block">
                <div className="logs">
                    <img className={visibleLogs ? 'active' : ''} onClick={() => setVisibleLogs(!visibleLogs)}
                         src={ASSETS_URL + "/images/arrow.svg"}/>
                    <div className={"messages-block"}>
                        <img className={'clear_logs'} onClick={e => clearLogs(logs)} src={ASSETS_URL + "/images/clear.svg"}/>
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