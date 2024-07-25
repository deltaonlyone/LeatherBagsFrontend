import React, { useEffect, useState } from 'react';
import styles from './SaleTimer.module.css';
import InfiniteLoop from "../itemVideo/InfiniteLooper";

const SaleTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const nextMonday = new Date(now);
            nextMonday.setDate(nextMonday.getDate() + (((1 + 7 - nextMonday.getDay()) % 7) || 7));
            nextMonday.setHours(0, 0, 0, 0);

            const difference = nextMonday - now;
            const timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60))),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / (1000)) % 60)
            };

            setTimeLeft(timeLeft);
        };

        calculateTimeLeft();
        const timerId = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>ЗНИЖКА ДІЙСНА ЩЕ:</div>
            <div className={styles.timer}>
                <div className={styles.time}>
                    <a className={styles.var}>{timeLeft.hours}</a>Годин
                </div>
                <div className={styles.time}>
                    <a className={styles.var}>{timeLeft.minutes}</a>Хвилин
                </div>
                <div className={styles.time}>
                    <a className={styles.var}>{timeLeft.seconds}</a>Секунд
                </div>
            </div>

        </div>
    );
}

export default SaleTimer;
