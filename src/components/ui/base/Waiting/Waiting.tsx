import React, {FC} from 'react';
import './waiting.scss'

interface IWaiting extends React.HTMLProps<HTMLDivElement> {
    isWaiting: boolean
}

const Waiting: FC<IWaiting> = ({isWaiting, ...props}) => {
    return (
        <div {...props}
            className={['waiting', isWaiting ? 'active' : ''].join(' ')}
        >
            <div className={'circle'}></div>
        </div>
    );
};

export default Waiting;