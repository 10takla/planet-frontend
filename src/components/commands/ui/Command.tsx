import React, {FC, useCallback} from 'react';

interface ICommand {
    text: string
    command: () => void
}

const Command: FC<ICommand> = ({text, command}) => {
    const handleOnClick = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
        command()
    }, []);

    return (
        <span onClick={handleOnClick}>
           {text}
        </span>
    );
};

export default Command;