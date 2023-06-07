import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/app/AppStateSlice";
import {ASSETS_URL, SERVER_HOSTS} from "../../../config";
import Currency from "../../ui/info/plot/Currency";
import UserFocus from "../../ui/userViews/UserFocus";
import UserFirstView from "../../ui/userViews/UserFirstView/UserFirstView";

const UserHead = () => {
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.userDataReducer.authUser!)
    const {visibleUserMenu, currency} = useAppSelector(state => state.appStateReducer)

    return (
        <div className='user'>
            <div className='wallet'>
                <img src={ASSETS_URL + "/images/wallet.svg"}/>
                <div className='cash_in'
                     onClick={() => dispatch(appStateSlice.actions.setActiveModal('wallet'))}>
                    {authUser && <Currency amount={authUser.wallet} currency={'point'}/>}
                    <img src={ASSETS_URL + "/images/add.svg"}/>
                </div>
            </div>
            <UserFirstView user={authUser}
                           onClick={() => dispatch(appStateSlice.actions.setVisibleUserMenu(!visibleUserMenu))}/>
        </div>
    );
};

export default UserHead;