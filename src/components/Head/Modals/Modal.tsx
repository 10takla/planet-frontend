import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/AppStateSlice";
import {IModalElements, ModalType} from "../../../types/user/modalTypes";
import AnimationByCss from "../../UI/Animation/AnimationByCss";
import SettingsModal from "./Content/SettingsModal";
import Wallet from "./Content/Wallet";
import PlotsContent from "./Content/PlotsContent";


const Modal = () => {
    const modals: IModalElements[] = [
        {title: 'Кошелек ', name: 'wallet', content: <Wallet/>},
        {title: 'Участки ', name: 'plots', content: <PlotsContent/>},
        {title: 'Корзина ', name: 'basket'},
        {title: 'Настройки аккаунта ', name: 'settings', content: <SettingsModal/>},
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
            <div className='modal-back'>
                <React.Fragment>
                    {modals.map(modal => (
                        activeModal === modal.name && (
                            <div key={modal.name} className='modal'>
                                <div className='head'>
                                    <h1 className='title'>{modal.title}</h1>
                                    <img onClick={() => setVisibleModal(false)}
                                         className='close' src="/assets/images/close.svg"/>
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