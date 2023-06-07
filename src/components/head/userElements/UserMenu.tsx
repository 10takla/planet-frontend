import React, {MouseEvent, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/app/AppStateSlice";
import {IModalElements} from "../../../types/user/modalTypes";
import AnimationByCss from "../../ui/animations/AnimationByCss";
import {userDataSlice} from "../../../reducers/slices/UserDataSlice";

const UserMenu = () => {
    const dispatch = useAppDispatch()
    const visibleUserMenu = useAppSelector(state => state.appStateReducer.visibleUserMenu)

    const menuElements: IModalElements[] = [
        {title: 'Мои Участки', name: 'plots'},
        {title: 'Корзина', name: 'basket'},
        {title: 'Настройки', name: 'settings'},
    ]
    const userMenuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        // if (visibleUserMenu){
        //     console.log(visibleUserMenu)
        //     const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
        //         if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        //             dispatch(appStateSlice.actions.setVisibleUserMenu(false))
        //         }
        //     };
        //     // @ts-ignore
        //     document.addEventListener('click', handleClickOutside);
        //     return () => {// @ts-ignore
        //         document.removeEventListener('click', handleClickOutside);
        //     };
        // }
    }, [visibleUserMenu]);

    return (
        <AnimationByCss in={visibleUserMenu}
                        timeout={'--animation-duration-head'}
                        classNames={'head-animation-window'}
                        mountOnEnter unmountOnExit
        >
            <div className='user-menu' ref={userMenuRef}
            >
                {menuElements.map(el => (
                    <li key={el.name}
                        onClick={() => dispatch(appStateSlice.actions.setActiveModal(el.name))}>{el.title}</li>
                ))}
                <li onClick={() => dispatch(userDataSlice.actions.setAuthUser(null))}>Выйти</li>
            </div>
        </AnimationByCss>
    );
};

export default UserMenu;