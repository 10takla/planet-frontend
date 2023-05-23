import React from 'react';
import './styles/App.scss';
import Head from "./components/head/Head";
import StoreCombine from "./components/store/StoreCombine";
import CombineMessages from "./components/messages/CombineMessages";
import {useAppSelector} from "./hooks/redux";


function App() {
    const {fullscreen} = useAppSelector(state => state.storeStateReducer.actionPanel.buttons)

    return (
        <div className={["App", fullscreen ? 'fullscreen': ''].join(' ')}>
            <Head/>
            <CombineMessages/>
            <StoreCombine/>
        </div>
    );
}

export default App;
