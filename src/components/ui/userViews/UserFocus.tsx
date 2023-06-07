import React, {FC, useCallback} from 'react';
import {IFirstViewUser} from "../../../types/user/userTypes";
import {useAppDispatch} from "../../../hooks/redux";
import {appStateSlice} from "../../../reducers/slices/app/AppStateSlice";
import {userDataSlice} from "../../../reducers/slices/UserDataSlice";
import UserFirstView from "./UserFirstView/UserFirstView";

interface IUserFocus {
    user: IFirstViewUser
}

const UserFocus: FC<IUserFocus> = ({user}) => {
    const dispatch = useAppDispatch()
    const handleOnClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(userDataSlice.actions.setFocusUserId(user.id))
        dispatch(appStateSlice.actions.setActiveModal('user'))
    }, []);

    return (
        <UserFirstView user={user} onClick={handleOnClick}/>
    );
};
export default UserFocus;