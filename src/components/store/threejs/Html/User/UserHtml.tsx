import React, {FC} from 'react';
import {requestURL} from "../../../../../helpers/requestApi";
import {useAppSelector} from "../../../../../hooks/redux";
import {IPlot} from "../../../../../types/store/threejs/planetObjectsTypes";
interface IUserHtml extends React.HTMLProps<any>{
    plot: IPlot
}
const UserHtml:FC<IUserHtml> = ({plot, ...props}) => {
    return (
        <div className={"plot-user"} {...props}>
            <img src={requestURL(plot.user?.logo!)}/>
        </div>
    );
};

export default UserHtml;