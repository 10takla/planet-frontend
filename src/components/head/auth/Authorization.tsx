import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import Form from "./Form";
import {getCookie} from "../../../helpers/cookieApi";
import {fetchAuthUser} from "../../../reducers/ActionCreator";
import {forms} from "../../../configs/formAuth";
import AnimationByCss from "../../ui/animations/AnimationByCss";
import {userDataSlice} from "../../../reducers/slices/UserDataSlice";

const Authorization = () => {
    const activeForm = useAppSelector(state => state.appStateReducer.activeAuthForm)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            fetchAuthUser(dispatch, 'authenticate', {}, {method: "POST", token: token})
                .then(data => {
                    dispatch(userDataSlice.actions.setAuthState({isAuth: true, token: token}))
                })
                .catch(error => {
                    dispatch(userDataSlice.actions.setAuthState({isAuth: false}))
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