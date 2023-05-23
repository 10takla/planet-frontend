import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {appStateSlice} from "../../reducers/slices/AppStateSlice";
import Authorization from "./auth/Authorization";
import UserHead from "./userElements/UserHead";
import UserMenu from "./userElements/UserMenu";
import Modal from "./modals/Modal";

const Head = () => {
    const {isAuth} = useAppSelector(state => state.userDataReducer.authState)
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