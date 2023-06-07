import React, {FC, HTMLProps} from 'react';
import {USER_ICONS_URL} from "../../../../config";
import {IFirstViewUser} from "../../../../types/user/userTypes";
import "./userFirstView.scss"

interface IUserFirstView extends HTMLProps<HTMLDivElement> {
    user: IFirstViewUser
}

const UserFirstView: FC<IUserFirstView> = ({user: {username, color, logo}, ...props}) => {


    return (
        <div {...props} className='user avatar'>
            <img src={USER_ICONS_URL + logo}/>
            <span className='username'>{username}</span>
            <div className={'user-back'} style={{background: color}}></div>
        </div>
    );
};

export default UserFirstView;