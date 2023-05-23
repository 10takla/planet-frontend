import React, {FC, useCallback} from 'react';
import {requestURL} from "../../../helpers/requestApi";
import {IFirstViewUser} from "../../../types/user/userTypes";
import "../../../styles/ui/user/userFirstView.scss"
import {appStateSlice} from "../../../reducers/slices/AppStateSlice";
import {AppDispatch} from "../../../reducers/store";
import {userDataSlice} from "../../../reducers/slices/UserDataSlice";

interface IUserFirstView extends IFirstViewUser {
    dispatch: AppDispatch
}

const UserFirstView: FC<IUserFirstView> = ({logo, id, username, dispatch}) => {
    const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(userDataSlice.actions.setFocusUserId(id))
        dispatch(appStateSlice.actions.setActiveModal('user'))
    }, []);

    return (
        <div className='user avatar' onClick={handleOnClick}>
            <img src={requestURL(logo)}/>
            <span className='username'>{username}</span>
        </div>
    );
};

export default UserFirstView;