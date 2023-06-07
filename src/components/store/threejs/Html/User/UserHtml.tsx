import React, {FC} from 'react';
import {requestURL} from "../../../../../helpers/requestApi";
import {IPlot} from "../../../../../types/entities/plotType";

interface IUserHtml extends React.HTMLProps<any>{
    plot: IPlot
}

const UserHtml:FC<IUserHtml> = ({plot, ...props}) => {
    return (
        <div className={"plot-user"} {...props}>
            <img src={requestURL(plot.owner?.logo!)}/>
        </div>
    );
};

export default UserHtml;