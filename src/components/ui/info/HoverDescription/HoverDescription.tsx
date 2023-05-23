import React, {FC, HTMLProps, useMemo} from 'react';
import styles from './hoverDescription.module.scss';

interface IHoverDescription extends HTMLProps<HTMLDivElement> {
    description: string
    children: React.ReactNode
    isActive?: boolean
    oppositeDescription?: string
}


const HoverDescription: FC<IHoverDescription> = ({children, isActive, oppositeDescription, description, ...props}) => {
    const finalDescription = useMemo(() => {
        if (isActive) {
            return oppositeDescription
        }
        return description
    }, [isActive]);


    return (
        <div {...props} className={[props.className, styles.hoveredElement].join(' ')}>
            {children}
            <span className={'description'}>
                {finalDescription}
            </span>
        </div>
    );
};

export default HoverDescription;