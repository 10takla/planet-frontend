import React, {FC, useEffect, useMemo} from 'react';
import {IMessage} from "../../../types/user/messagesType";
import {TransitionGroup} from "react-transition-group";
import AnimationByCss from "../../ui/animations/AnimationByCss";
import MessageItem, {IMessageComponent} from "./MessageItem";
import {ASSETS_URL} from "../../../config";

interface IBlock extends Omit<IMessageComponent, "message"> {
    messages: IMessage[];
    clearMessages: (messages: IMessage[]) => void
}

const MessagesList: FC<IBlock> = ({clearMessages, messages, ...props}) => {

    return (
        <TransitionGroup className={['messages-list'].join(' ')}>
            {messages.map(message => (
                <AnimationByCss key={message.id} timeout={`--animation-messages-item-duration`}
                                classNames="item">
                    <MessageItem key={message.id} lifetime={props.lifetime} message={message} clearMessages={clearMessages}/>
                </AnimationByCss>
            ))}
        </TransitionGroup>
    );
}

export default MessagesList;