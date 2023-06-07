import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import Form from "../../auth/Form";
import {IFormAuth} from "../../../../types/user/authTypes";
import {inputs} from "../../../../configs/formAuth";
import {fetchAuthUser, fetchMediaData} from "../../../../reducers/ActionCreator";
import {requestURL} from "../../../../helpers/requestApi";
import {getCookie} from "../../../../helpers/cookieApi";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {userDataSlice} from "../../../../reducers/slices/UserDataSlice";

const SettingsModal = () => {
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.userDataReducer.authUser)

    const form: IFormAuth = {
        class: 'update',
        inputs: [
            inputs.username(false, authUser?.username),
            inputs.password(false),
            inputs.status(false, authUser?.status),
            inputs.telegramName(false, authUser?.telegramName),
        ],
        button: {text: 'Сохранить', request: {method: "PATCH", token: getCookie('token')}},
    }

    const [avatars, setAvatars] = useState<string[]>([]);

    useEffect(() => {
        fetchMediaData()
            .then(data => setAvatars(data))
            .catch(error => console.log(error))
    }, []);

    const onImgInput = useCallback((url: string) => {
        console.log(url.replace('/images/user_icons/', ''))
        fetchAuthUser(form.class,
            {
                logo: url.replace('/media/images/user_icons/', '')
            },
            {method: "PATCH"}
        )
            .then((data: any) => {
                if (form.button.request.method === "PATCH") {
                    dispatch(userDataSlice.actions.updateAuthUser(data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return (
        <React.Fragment>
            <div className='modal-content-avatars'>
                {avatars.map((url, i) => (
                    <img onClick={()=> onImgInput(url)}
                        className={authUser?.logo === url ? 'active' : ''}  key={i}
                         src={requestURL(url)}
                    />
                ))}
            </div>
            <Form form={form}/>
        </React.Fragment>
    );
};

export default SettingsModal;