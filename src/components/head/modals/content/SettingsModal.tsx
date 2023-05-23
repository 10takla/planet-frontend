import React, {useEffect, useState} from 'react';
import Form from "../../auth/Form";
import {IFormAuth} from "../../../../types/user/authTypes";
import {inputs} from "../../../../configs/formAuth";
import {fetchMediaData} from "../../../../reducers/ActionCreator";
import {requestURL} from "../../../../helpers/requestApi";
import {getCookie} from "../../../../helpers/cookieApi";

const SettingsModal = () => {
    const form: IFormAuth = {
        class: 'update',
        inputs: [inputs.username, inputs.password],
        button: {text: 'Сохранить', request: {method: "PUT", token: getCookie('token')}},
    }

    const [avatars, setAvatars] = useState<string[]>([]);

    useEffect(() => {
        fetchMediaData()
            .then(data => setAvatars(data))
            .catch(error => console.log(error))
    }, []);

    return (
        <React.Fragment>
            <div className='modal-content-avatars'>
                {avatars.map((url, i) => (
                    <img key={i} src={requestURL(url)}/>

                ))}
            </div>
            <Form form={form}/>
        </React.Fragment>
    );
};

export default SettingsModal;