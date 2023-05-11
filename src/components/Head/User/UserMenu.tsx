import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/AppStateSlice";
import {IModalElements} from "../../../types/user/modalTypes";
import AnimationByCss from "../../UI/Animation/AnimationByCss";

const UserMenu = () => {
    const dispatch = useAppDispatch()
    const visibleUserMenu = useAppSelector(state => state.appStateReducer.visibleUserMenu)

    const menuElements: IModalElements[] = [
        {title: 'Участки', name: 'plots'},
        {title: 'Корзина', name: 'basket'},
        {title: 'Найстройки', name: 'settings'},
    ]

    return (
        <AnimationByCss in={visibleUserMenu}
                        timeout={'--animation-duration-head'}
                        classNames={'head-animation-window'}
                        mountOnEnter unmountOnExit
        >
            <div className='user-menu'>
                {menuElements.map(el => (
                    <li key={el.name}
                        onClick={() => dispatch(appStateSlice.actions.setActiveModal(el.name))}>{el.title}</li>
                ))}
                <li onClick={() => dispatch(appStateSlice.actions.setAuthState({isAuth: false}))}>Выйти</li>
            </div>
        </AnimationByCss>
    );
};

export default UserMenu;