import {CSSTransition,} from "react-transition-group";
import React, {FC, Ref,} from "react";
import {CSSTransitionProps} from "react-transition-group/CSSTransition";
import {TransitionProps} from "react-transition-group/Transition";


interface IHeadAnimation extends Omit<CSSTransitionProps, 'timeout'> {
    timeout: `--${string}` | number;
    animationRef?: React.Ref<any>;
    children: React.ReactNode;
}

const AnimationByCss: FC<IHeadAnimation> =
    ({
         children,
         timeout,
         animationRef,
         ...props
     }) => {

        if (typeof timeout === "string") {
            const rootStyles = getComputedStyle(document.documentElement);
            timeout = parseInt(rootStyles.getPropertyValue(timeout));
        }

        return (
            <CSSTransition {...props} timeout={timeout} ref={animationRef}
            >
                {children}
            </CSSTransition>
        );
    };

export default AnimationByCss;