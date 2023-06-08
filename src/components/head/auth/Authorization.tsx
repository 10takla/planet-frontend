import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import Form from "./Form";
import {getCookie} from "../../../helpers/cookieApi";
import {fetchAuthUser} from "../../../reducers/ActionCreator";
import {forms} from "../../../configs/formAuth";
import AnimationByCss from "../../ui/animations/AnimationByCss";
import {userDataSlice} from "../../../reducers/slices/UserDataSlice";
import {appStateSlice} from "../../../reducers/slices/app/AppStateSlice";

const Authorization = () => {
    const activeForm = useAppSelector(state => state.appStateReducer.activeAuthForm)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = getCookie('token')

        if (token) {
            dispatch(appStateSlice.actions.setEvent({'isProcessAuth': true}))
            fetchAuthUser('authenticate', {}, {method: "POST", token: token})
                .then((data: any) => {
                    dispatch(userDataSlice.actions.setAuthUser(data))
                })
                .catch(error => {
                    error.detail === 'Invalid token.' && dispatch(userDataSlice.actions.setAuthUser(null))
                })
                .finally(() => {
                    dispatch(appStateSlice.actions.setEvent({'isProcessAuth': false}))
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