import React, {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {appStateSlice} from "../../reducers/slices/app/AppStateSlice";
import Authorization from "./auth/Authorization";
import UserHead from "./userElements/UserHead";
import UserMenu from "./userElements/UserMenu";
import Modal from "./modals/Modal";
import UserFocus from "../ui/userViews/UserFocus";

const Head = () => {
    const authUser = useAppSelector(state => state.userDataReducer.authUser)
    const dispatch = useAppDispatch()

    return (
        <React.Fragment>
            <div className="head-back" style={{background: "red"}}
                 onMouseLeave={() => dispatch(appStateSlice.actions.setVisibleUserMenu(false))}
            >
                <div className='head'>
                    <a className='home selectable' href='/'>Planetary Plot <br/>Store</a>
                    {authUser ? <UserHead/>
                        :
                        <button onMouseEnter={e => dispatch(appStateSlice.actions.setActiveForm('sign'))}
                                className='sign selectable'>Войти</button>}
                </div>
                {authUser ?
                    <React.Fragment>
                        <UserMenu/>
                    </React.Fragment>
                    :
                    <Authorization/>}
            </div>
        </React.Fragment>

    );
};

export default Head;