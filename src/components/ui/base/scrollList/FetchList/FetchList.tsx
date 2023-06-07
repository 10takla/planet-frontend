import React, {FC, FocusEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useFetchGet} from "../../../../../hooks/useFetch";
import FetchScrollList from "../FetchScrollList";
import {IFetch} from "../../../../../types/fetch/fetchTypes";
import "./fetchList.scss"
import {IPlot} from "../../../../../types/entities/plotType";
import {useAppSelector} from "../../../../../hooks/redux";

interface IFetchListPlots extends IFetch<IPlot> {
    children: React.ReactNode
    returnList: React.Dispatch<React.SetStateAction<any>>
    size: number
}

const FetchList: FC<IFetchListPlots> = ({children, returnList, size, ...props}) => {
    const [searchPlot, setSearchPlot] = useState('');
    const [index, setIndex] = useState(0);
    type RF = typeof returnList extends React.Dispatch<infer T> ? T : never;
    const [accumulateList, setAccumulateList] = useState<RF>([]);
    const [list, fetchGetData, isWaiting] = useFetchGet<IPlot, RF>([index])

    useEffect(() => {
        const fetchProps = {
            endpoint: props.endpoint,
            isToken: props.isToken,
            body: {
                ...props.body,
                search: searchPlot,
                from: index * size,
                to: index * size + size,
            },
        }
        fetchGetData(fetchProps);
    }, [index, searchPlot]);

    useEffect(() => {
        setIndex(0);
        setAccumulateList([]);
    }, [searchPlot]);

    useEffect(() => {
        if (list) {
            setAccumulateList((prevList: any) => {
                const uniqueList = Array.from(new Set([...prevList, ...list].map(obj => obj.id)))
                    .map(id => {
                        return [...prevList, ...list].find(obj => obj.id === id);
                    });

                return uniqueList;
            });
        }
    }, [list]);

    useEffect(() => {
        returnList(accumulateList)
    }, [accumulateList]);

    const onInputBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearchPlot(searchValue);
    }, []);

    const onInputKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const searchValue = event.currentTarget.value;
            setSearchPlot(searchValue);
        }
    }, []);

    return (
        <div className={'list-block'}>
            <input className={'search'} onKeyDown={onInputKeyDown} onBlur={onInputBlur} placeholder="Поиск"/>
            <FetchScrollList list={accumulateList} isWaiting={isWaiting} setIndexList={setIndex}>
                {children}
            </FetchScrollList>
        </div>
    );
};

export default FetchList;