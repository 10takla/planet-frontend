import React, {FC, useEffect, useState} from 'react';
import {useFetch} from "../../../../../hooks/useFetch";
import {IPlanet, IPlot} from "../../../../../types/store/threejs/planetObjectsTypes";
import FetchScrollList from "../FetchScrollList";
import {AllowModels, IFetch} from "../../../../../types/fetch/fetchTypes";
import "./fetchList.scss"

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

    useEffect(() => {
        returnList(accumulateList)
    }, [accumulateList]);

    useEffect(() => {
        setIndex(0)
        setAccumulateList([])
    }, [searchPlot]);

    const [list, isWaiting] = useFetch<IPlot, RF>(
        {
            endpoint: props.endpoint,
            isToken: props.isToken,
            body: {
                ...props.body,
                from: index * size,
                to: index * size + size,
                search: searchPlot,
            },
        }, [searchPlot, index])

    useEffect(() => {
        if (list) {
            setAccumulateList(
                Array.from(new Set([...accumulateList, ...list].map(obj => obj.id)))
                    .map(id => {
                        return [...accumulateList, ...list].find(obj => obj.id === id);
                    })
            )
        }
    }, [list]);

    return (
        <div className={'list-block'}>
            <input className={'search'} onBlur={e => setSearchPlot(e.target.value)} placeholder="Поиск"/>
            <FetchScrollList list={accumulateList} isWaiting={isWaiting} setIndexList={setIndex}>
                {children}
            </FetchScrollList>
        </div>
    );
};

export default FetchList;