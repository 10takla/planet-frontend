import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {appStateSlice} from "../../reducers/slices/AppStateSlice";
import Authorization from "./Auth/Authorization";
import UserHead from "./User/UserHead";
import UserMenu from "./User/UserMenu";
import Modal from "./Modals/Modal";

const Head = () => {
    const {isAuth} = useAppSelector(state => state.appStateReducer.authState)
    const dispatch = useAppDispatch()

    return (
        <div className="head-back"
             // onMouseLeave={() => dispatch(appStateSlice.actions.setVisibleUserMenu(false))}
        >
            <div className='head'>
                <a className='home selectable' href='/'>Buy Planets<br/>Plots</a>
                {isAuth ? <UserHead/>
                    :
                    <button onMouseEnter={e => dispatch(appStateSlice.actions.setActiveForm('sign'))}
                            className='sign selectable'>Войти</button>}
            </div>
            {isAuth ?
                <React.Fragment>
                    <UserMenu/>
                    <Modal/>
                </React.Fragment>
                :
                <Authorization/>}
        </div>
    );
};

export default Head;