import React from 'react';
import './styles/App.scss';
import Head from "./components/Head/Head";
import StoreCombine from "./components/Store/StoreCombine";
import CombineMessages from "./components/AppMessages/CombineMessages";

function App() {


    return (
        <div className="App">
            <Head/>
            <CombineMessages/>
            <StoreCombine/>
        </div>
    );
}

export default App;
