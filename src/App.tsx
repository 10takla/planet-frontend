import React, {useEffect} from 'react';
import './styles/App.scss';
import Head from "./components/head/Head";
import StoreCombine from "./components/store/StoreCombine";
import CombineMessages from "./components/messages/CombineMessages";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import Modal from "./components/head/modals/Modal";


function App() {
    const {isFullScreen} = useAppSelector(state => state.planetSceneReducer.store.actions.canvas)
    const isProcessAuth = useAppSelector(state => state.appStateReducer.events.isProcessAuth)
    const authUser = useAppSelector(state => state.userDataReducer.authUser)

    return (
        <div className={["App", isFullScreen ? 'fullscreen' : ''].join(' ')}>
            <Head/>
            {authUser && <Modal/>}
            <CombineMessages/>
            {!isProcessAuth && <StoreCombine/>}
        </div>
    );
}

export default App;
