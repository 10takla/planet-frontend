import React, {FC, useCallback, useState} from 'react';
import Waiting from "../Waiting/Waiting";


interface IListPlots {
    list: any[]
    isWaiting: boolean
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

const ScrollList: FC<IListPlots> = ({list, isWaiting, setIsFetching, children}) => {

    const [scrollOffset, setScrollOffset] = useState(0);

    const handleOnScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const {scrollTop, scrollHeight, clientHeight} = e.currentTarget;
        setScrollOffset(scrollTop)

        if (scrollTop > scrollOffset) {
            if ((scrollHeight - (scrollTop + clientHeight) <= 5)) {
                setIsFetching(true)
            }
        }

    }, [scrollOffset]);


    return (
        <React.Fragment>
            <div className={'list'} onScroll={handleOnScroll}
                 style={{position: "relative", display: 'flex', flexDirection: 'column', overflowY: 'scroll',}}
            >
                {children}
            </div>
            <Waiting style={{alignSelf: "center", position: 'absolute', bottom: 0}} isWaiting={isWaiting}/>
        </React.Fragment>
    );
};

export default ScrollList;