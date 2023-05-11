import React, {FC, useEffect} from 'react';
import {IMessage} from "../../types/user/messagesType";

export interface IMessageComponent {
    message: IMessage
    setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
    lifetime?: number
}

const MessageItem: FC<IMessageComponent> = ({message, setMessages, lifetime}) => {
    useEffect(() => {
        lifetime &&
        setTimeout(() => {
            setMessages(items => items.filter(item => item.id !== message.id))
        }, lifetime)
    }, []);

    return (
        <li className='item'>
            <span>{message.text}</span>
            <img onClick={e => {
                console.log(e)
                setMessages(items => items.filter(item => item.id !== message.id))
            }}
                 src="/assets/images/close.svg"/>
        </li>
    )
}

export default MessageItem;