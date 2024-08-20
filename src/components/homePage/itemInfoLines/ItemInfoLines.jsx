import React from 'react';
import {useInView} from 'react-intersection-observer';
import CountUp from 'react-countup';
import styles from './ItemInfoLines.module.css';

const StatItem = ({end, text}) => {
    const {ref, inView} = useInView({
        triggerOnce: true,  // Тригер тільки один раз
        threshold: 0.1,     // Поріг видимості (10% видимо)
    });

    return (
        <div className={styles.statItem} ref={ref}>
            <div className={styles.numbs}>
                {inView ? <CountUp end={end} duration={2}/> : '0'}
                +
            </div>
            <div className={styles.secondaryText}>{text}</div>
        </div>
    );
};

const ItemInfoLines = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.textWrap}>
                КУПУВАТИ У НАС КОМФОРТНО, БЕЗПЕЧНО ТА ВИГІДНО
            </div>
            <div className={styles.statsWrap}>
                <StatItem end={500} text="Задоволених покупців"/>
                <StatItem end={10} text="Років на ринку"/>
                <StatItem end={20} text="Досвічених фахівців"/>
                <StatItem end={40} text="Моделей"/>
            </div>
        </div>
    );
};

export default ItemInfoLines;
