import React, {FC} from 'react';

interface ILabel {
    children: React.ReactNode
}

const Label: FC<ILabel> = ({children}) => {
    return (
        <label style={{
            display: "inline-flex", columnGap: '0.3em'
        }}>
            {children}
        </label>
    );
};

export default Label;