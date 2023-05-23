import React, {FC, useEffect, useMemo, useState} from 'react';
import {IMessage} from "../../../types/user/messagesType";
import {ASSETS_URL} from "../../../config";

export interface IMessageComponent {
    message: IMessage
    clearMessages: (messages: IMessage[]) => void
    lifetime?: number
}

const MessageItem: FC<IMessageComponent> = ({message, clearMessages, lifetime}) => {
    const [time, setTime] = useState<number>(lifetime ?? message.lifetime ?? 0);

    useEffect(() => {
        if (time) {
            let i = time
            const interval = setInterval(() => {
                i -= 1000
                setTime(i)
                if (i <= 0) {
                    clearInterval(interval)
                    clearMessages([message])
                }
            }, 1000)
        }
    }, []);

    const timeConvert = useMemo(() => {
        const tmp = new Date(time)
        return tmp.toISOString().substr(11, 8).split(':').filter(o => o !== '00').join(':')
    }, [time])

    return (
        <li className='item'>
            <span>{message.text}</span>
            <div className={'right-side'}>
                <img onClick={e => clearMessages([message])}
                     src={ASSETS_URL + "/images/close.svg"}/>
                <span className={'lifetime'}>{timeConvert}</span>
            </div>
        </li>
    )
}

export default MessageItem;