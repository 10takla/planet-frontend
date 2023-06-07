import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/app/AppStateSlice";
import WalletModal from "./content/WalletModal";
import SettingsModal from "./content/SettingsModal";
import AnimationByCss from "../../ui/animations/AnimationByCss";
import BasketModal from "./content/BasketModal";
import {ASSETS_URL} from "../../../config";
import {IModalElements} from "../../../types/user/modalTypes";
import UserModal from "./content/UserModal";
import PlotsModal from "./content/PlotsModal";



const Modal = () => {
    const modals: IModalElements[] = [
        {title: 'Пополнить счет', name: 'wallet', content: <WalletModal/>},
        {title: 'Мои Участки', name: 'plots', content: <PlotsModal/>},
        {title: 'Корзина ', name: 'basket', content: <BasketModal/>},
        {title: 'Настройки аккаунта', name: 'settings', content: <SettingsModal/>},
        {title: 'Пользователь', name: 'user', content: <UserModal/>},
    ]
    const animationRef = useRef<JSX.Element>(null);
    const dispatch = useAppDispatch()
    const activeModal = useAppSelector(state => state.appStateReducer.activeModal)
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    useEffect(() => {
        activeModal ?
            setVisibleModal(true) :
            setVisibleModal(false)
    }, [activeModal]);

    return (
        <AnimationByCss in={visibleModal}
                        timeout={'--animation-duration-modal'}
                        classNames={'modal-animation'}
                        animationRef={animationRef}
                        mountOnEnter unmountOnExit
                        onExited={() => dispatch(appStateSlice.actions.setActiveModal(null))}
        >
            <div className='modal-back app-modal'>
                <React.Fragment>
                    {modals.map(modal => (
                        activeModal === modal.name && (
                            <div key={modal.name} className='modal'>
                                <div className='head'>
                                    <h1 className='title'>{modal.title}</h1>
                                    <img onClick={() => setVisibleModal(false)}
                                         className='close' src={ASSETS_URL + "/images/close.svg"}/>
                                </div>
                                <div className='content'>
                                    {modal.content}
                                </div>
                            </div>
                        )
                    ))}
                </React.Fragment>
            </div>
        </AnimationByCss>
    );
};

export default Modal;