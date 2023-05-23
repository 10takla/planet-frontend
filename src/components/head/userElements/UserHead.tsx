import React, {useEffect} from 'react';
import {fetchUserData} from "../../../reducers/ActionCreator";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/AppStateSlice";
import {ASSETS_URL} from "../../../config";
import Currency from "../../ui/base/sales/Currency";

const UserHead = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.userDataReducer.authState.token) as string

    useEffect(() => {
        fetchUserData(dispatch, token)
    }, []);


    const user = useAppSelector(state => state.userDataReducer.currentUser)
    const {visibleUserMenu, currency} = useAppSelector(state => state.appStateReducer)
    return (
        <div className='user'>
            <div className='wallet'>
                <img src={ASSETS_URL + "/images/wallet.svg"}/>
                <div className='cash_in selectable'
                     onClick={() => dispatch(appStateSlice.actions.setActiveModal('wallet'))}>
                    {user && <Currency amount={user.wallet}/>}
                    <img src={ASSETS_URL + "/images/add.svg"}/>
                </div>
            </div>
            <img onClick={() => dispatch(appStateSlice.actions.setVisibleUserMenu(!visibleUserMenu))}
                 className='selectable' src={user?.logo}/>
        </div>
    );
};

export default UserHead;