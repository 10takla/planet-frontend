import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./reducers/store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
export const store = setupStore()


root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);