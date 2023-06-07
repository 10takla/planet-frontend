import React, {FC, HTMLProps} from 'react';

interface ILabel extends HTMLProps<HTMLLabelElement> {
    children: React.ReactNode
}

const Label: FC<ILabel> = ({children, ...props}) => {
    return (
        <label style={{
            display: "inline-flex", columnGap: '0.3em', alignItems: "center"
        }} {...props} >
            {children}
        </label>
    );
};

export default Label;