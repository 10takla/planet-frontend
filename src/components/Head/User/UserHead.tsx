import React, {useEffect} from 'react';
import {fetchUserData} from "../../../reducers/ActionCreator";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/AppStateSlice";

const UserHead = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.appStateReducer.authState.token) as string

    useEffect(() => {
        fetchUserData(dispatch, token)
    }, []);


    const user = useAppSelector(state => state.userDataReducer.currentUser)
    const {visibleUserMenu} = useAppSelector(state => state.appStateReducer)
    return (
        <div className='user'>
            <div className='wallet'>
                <img src="/assets/images/wallet.svg"/>
                <div className='cash_in selectable'
                     onClick={() => dispatch(appStateSlice.actions.setActiveModal('wallet'))}>
                    <div className='currency'>
                        {user?.wallet}
                        <img src="/assets/images/currency/dollar.svg"/>
                    </div>
                    <img src="/assets/images/add.svg"/>
                </div>
            </div>
            <img onClick={() => dispatch(appStateSlice.actions.setVisibleUserMenu(!visibleUserMenu))}
                 className='selectable' src={user?.logo}/>
        </div>
    );
};

export default UserHead;