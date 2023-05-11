import React, {FC} from 'react';
import {IMessage} from "../../types/user/messagesType";
import {TransitionGroup} from "react-transition-group";
import AnimationByCss from "../UI/Animation/AnimationByCss";
import MessageItem, {IMessageComponent} from "./MessageItem";
import {useAppDispatch} from "../../hooks/redux";
import {appStateSlice} from "../../reducers/slices/AppStateSlice";
import {messagesStateSlice} from "../../reducers/slices/MessagesStateSlice";

interface IBlock extends Omit<IMessageComponent, "message"> {
    className?: string;
    messages: IMessage[];
    setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

const MessagesList: FC<IBlock> = ({setMessages, messages, className, ...props}) => {
    const dispatch = useAppDispatch()
    const test = () => {
        dispatch(messagesStateSlice.actions.deleteMessages(messages.map(message => message.id)))
    }
    return (
        <div className={['messages', className].join(' ')}>
            {!props.lifetime && <img onClick={test}
                                     src="/assets/images/clear.svg"/>}
            <TransitionGroup className="list">
                {messages.map(message => (
                    <AnimationByCss key={message.id} timeout={`--animation-${className}-item-duration`}
                                    classNames="item">
                        <MessageItem lifetime={props.lifetime} message={message} setMessages={setMessages}/>
                    </AnimationByCss>
                ))}
            </TransitionGroup>
        </div>
    );
}

export default MessagesList;