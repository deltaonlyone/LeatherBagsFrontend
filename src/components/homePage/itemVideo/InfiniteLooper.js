import {useState, useRef, useEffect, useCallback} from 'react'
import styles from './InfiniteLooper.module.css';

const InfiniteLoop = (props) => {
    const [instanceCount, setInstanceCount] = useState(1);
    const [animationEnabled, setAnimationEnabled] = useState(false);
    const outerRef = useRef(null);
    const innerRef = useRef(null);

    const setupInstances = useCallback(() => {
        if (!innerRef?.current || !outerRef?.current) return;

        const width = innerRef.current.getBoundingClientRect().width;
        const parentWidth = outerRef.current.getBoundingClientRect().width;
        const instanceWidth = width / innerRef.current.children.length;

        if (width < parentWidth + instanceWidth) {
            setInstanceCount(instanceCount + Math.ceil(parentWidth / width));
        }
    }, [instanceCount]);

    useEffect(() => {
        setupInstances();
    }, []);

    useEffect(() => {
        setAnimationEnabled(true);
    }, []);

    return (
        <div className={`${styles.looper}`} ref={outerRef}>
            <div className={`${styles.looperContent}`} ref={innerRef}>
                {[...Array(instanceCount)].map((_, i) => (
                    <div key={i} className={`${styles.looperElement} ${animationEnabled ? styles.animated : ''}`}
                         style={{
                             animationDuration: `${props.speed}s`,
                             animationDirection: props.direction === 'right' ? 'reverse' : 'normal'
                         }}>
                        {props.children}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InfiniteLoop