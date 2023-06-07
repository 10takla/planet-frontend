import React, {CSSProperties, FC, HTMLProps, useEffect, useMemo, useRef, useState} from 'react';
import './hoverDescription.scss';
import {IDescription} from "../../../../types/store/panels/actionPanelTypes";

interface IHoverDescription extends IDescription, HTMLProps<HTMLDivElement> {
    children: React.ReactNode
    rootRef?: React.MutableRefObject<HTMLDivElement | null>
}


const HoverDescription: FC<IHoverDescription> = ({
                                                     children,
                                                     rootRef,
                                                     isActive,
                                                     oppositeDescription,
                                                     description,
                                                     ...props
                                                 }) => {
    const finalDescription = useMemo(() => {
        if (isActive) {
            return oppositeDescription
        }
        return description
    }, [isActive]);


    const childRef = useRef<any | null>(null);
    const [translate, setTranslate] = useState<CSSProperties['transform']>();

    useEffect(() => {
        if (childRef.current && rootRef?.current) {
            type tmp = Record<'top' | 'bottom' | 'right' | 'left', number>
            const get = (el: HTMLElement): tmp => {
                const EL = el.getBoundingClientRect()
                return {
                    top: EL.top,
                    bottom: el.offsetHeight + EL.top,
                    left: EL.left,
                    right: el.offsetWidth + EL.left,
                }
            }
            const [child, root] = [get(childRef.current), get(rootRef.current)]

            let t = ''
            if (child.top < root.top) {
                t += `translateY(${root.top - child.top}px)`
            }
            if (child.bottom > root.bottom) {
                t += `translateY(${root.bottom - child.bottom}px)`
            }
            if (child.right > root.right) {
                t += `translateX(${root.right - child.right}px)`
            }
            if (child.left < root.left) {
                t += `translateX(${root.left - child.left}px)`
            }
            setTranslate(t)
        }
    }, [childRef, rootRef]);

    return (
        <div  {...props} className={['hovered-element', props.className].join(' ')}>
            {children}
            <span style={{transform: translate}} ref={childRef} className={['description', props.className].join(' ')}>
                {finalDescription}
            </span>
        </div>
    );
};

export default HoverDescription;