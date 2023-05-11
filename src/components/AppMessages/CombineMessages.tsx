import React, {useCallback, useEffect, useState} from 'react';
import AnimationByCss from "../UI/Animation/AnimationByCss";
import {IMessage} from "../../types/user/messagesType";
import MessagesList from "./MessagesList";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {messagesStateSlice, messageStateReducer} from "../../reducers/slices/MessagesStateSlice";


const CombineMessages = () => {
    const dispatch = useAppDispatch()
    const {messages} = useAppSelector(state => state.messageStateReducer)
    const [logs, setLogs] = useState<IMessage[]>([])

    const [notices, setNotices] = useState<IMessage[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        visible && setNotices([])
    }, [visible]);

    useEffect(() => {
        setLogs(messages)
    }, [messages]);

    const addNewMessage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const message = {id: logs.length + 1, text: e.target.value, lifetime: null}
        !visible && setNotices(items => [...items, message])
        dispatch(messagesStateSlice.actions.setMessages([message]))
        message.lifetime && setTimeout(() => {
            dispatch(messagesStateSlice.actions.deleteMessages([message.id]))
        }, message.lifetime)
    }, [messages])

    return (
        <div className="all-messages">
            <div className={"notices"}>
                <MessagesList messages={notices} setMessages={setNotices} lifetime={4000}/>
            </div>
            <AnimationByCss in={visible} timeout="--animation-messages-duration" classNames="logs-block">
                <div className="logs">
                    <img className={visible ? 'active' : ''} onClick={() => setVisible(!visible)}
                         src="/assets/images/arrow.svg"/>
                    <div className={"messages-block"}>
                        {logs.length ?
                            <MessagesList messages={logs} setMessages={setLogs}/>
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