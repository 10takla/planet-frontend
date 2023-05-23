import React, {FC, useEffect, useState} from 'react';
import ScrollList from "./ScrollList";

interface IFetchScrollList {
    list: any[]
    isWaiting: boolean
    children: React.ReactNode
    setIndexList: React.Dispatch<React.SetStateAction<number>>
}

const FetchScrollList: FC<IFetchScrollList> = ({list, isWaiting, setIndexList, children}) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (isFetching) {
            setIndexList(index => index + 1)
        }
    }, [isFetching]);

    useEffect(() => {
        if (list) {
            setIsFetching(false)
        }
    }, [list]);

    return (
        <ScrollList list={list} isWaiting={isWaiting} setIsFetching={setIsFetching}>
            {children}
        </ScrollList>
    );
};

export default FetchScrollList;