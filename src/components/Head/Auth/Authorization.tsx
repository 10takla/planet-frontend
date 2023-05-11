import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import Form from "./Form";
import {getCookie} from "../../../helpers/cookieApi";
import {fetchAuthUser} from "../../../reducers/ActionCreator";
import {appStateSlice} from "../../../reducers/slices/AppStateSlice";
import {forms} from "../../../configs/formAuth";
import AnimationByCss from "../../UI/Animation/AnimationByCss";

const Authorization = () => {
    const activeForm = useAppSelector(state => state.appStateReducer.activeAuthForm)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            fetchAuthUser(dispatch, 'authenticate', {}, {method: "POST", token: token})
                .then(data => {
                    dispatch(appStateSlice.actions.setAuthState({isAuth: true, token: token}))
                })
                .catch(error => {
                    dispatch(appStateSlice.actions.setAuthState({isAuth: false}))
                })
        }
    }, []);

    return (
        <React.Fragment>
            {forms.map(form =>
                <AnimationByCss key={form.class} in={form.class === activeForm}
                                timeout={'--animation-duration-head'}
                                classNames={'head-animation-window'}
                                mountOnEnter unmountOnExit
                >
                    <Form form={form}/>
                </AnimationByCss>
            )}
        </React.Fragment>
    );
};

export default Authorization;