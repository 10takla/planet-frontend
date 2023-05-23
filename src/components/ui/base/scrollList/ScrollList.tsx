import React, {FC, useCallback} from 'react';
import Waiting from "../Waiting/Waiting";


interface IListPlots {
    list: any[]
    isWaiting: boolean
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

const ScrollList: FC<IListPlots> = ({list, isWaiting, setIsFetching, children}) => {

    const handleOnScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        //@ts-ignore
        const [offsetTop, height] = [e.target.scrollTop, e.target.scrollHeight]
        if (height - offsetTop < 500) {
            setIsFetching(true)
        }
    }, []);


    return (
        <React.Fragment>
            <div className={'list'} onScroll={handleOnScroll}
                 style={{position: "relative", display: 'flex', flexDirection: 'column', overflowY: 'scroll',}}
            >
                {children}
            </div>
            <Waiting style={{alignSelf: "center",position: 'absolute', bottom: 0}}  isWaiting={isWaiting}/>
        </React.Fragment>
    );
};

export default ScrollList;