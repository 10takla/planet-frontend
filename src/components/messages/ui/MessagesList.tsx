import React, {FC} from 'react';
import {IMessage} from "../../../types/user/messagesType";
import {TransitionGroup} from "react-transition-group";
import AnimationByCss from "../../ui/animations/AnimationByCss";
import MessageItem, {IMessageComponent} from "./MessageItem";
import {useAppDispatch} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/AppStateSlice";
import {messagesStateSlice} from "../../../reducers/slices/MessagesStateSlice";
import {ASSETS_URL} from "../../../config";

interface IBlock extends Omit<IMessageComponent, "message"> {
    className?: string;
    messages: IMessage[];
    clearMessages: (messages: IMessage[]) => void
}

const MessagesList: FC<IBlock> = ({clearMessages, messages, className, ...props}) => {

    return (
        <div className={['messages', className].join(' ')}>
            {!props.lifetime &&
                <img onClick={e => clearMessages(messages)} src={ASSETS_URL + "/images/clear.svg"}/>}
            <TransitionGroup className="list">
                {messages.map(message => (
                    <AnimationByCss key={message.id} timeout={`--animation-${className}-item-duration`}
                                    classNames="item">
                        <MessageItem lifetime={props.lifetime} message={message} clearMessages={clearMessages}/>
                    </AnimationByCss>
                ))}
            </TransitionGroup>
        </div>
    );
}

export default MessagesList;