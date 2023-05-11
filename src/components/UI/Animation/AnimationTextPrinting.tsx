import React, {FC, useEffect, useMemo, useState} from 'react';

interface IAnimationTextPrinting {
    text: string
    delay: number
    rangeCutString: [number, number]
}

const AnimationTextPrinting: FC<IAnimationTextPrinting> = ({text, delay, rangeCutString}) => {
    const [animatedText, setAnimatedText] = useState('');
    useEffect(() => {
        setAnimatedText('')

        let textTmp = text
        const [DELAY, N] = [delay, Math.floor(text.length / 5)]
        let [i, delayAnim] = [0, DELAY]
        const interval = setInterval(() => {
            const index = Math.floor(Math.random() * (1 + rangeCutString[0])) + rangeCutString[1]
            const cutText = textTmp.substring(0, index)
            if (i >= N || !cutText.length) clearInterval(interval)
            else {
                textTmp = textTmp.substring(index)
                setAnimatedText(text => text + cutText)
            }
            delayAnim = DELAY * (Math.random() * 10) ** 10
            i++
        }, delayAnim)
    }, [rangeCutString, delay, text]);


    return (
        <div>
            {animatedText}
        </div>
    );
};

export default AnimationTextPrinting;