import React, { useEffect, useState } from 'react';
import styles from './SaleTimer.module.css';

const SaleTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const nextMonday = new Date(now);
            nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
            nextMonday.setHours(0, 0, 0, 0);

            const difference = nextMonday - now;
            const timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60)
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
                    <a>{timeLeft.days}</a>Днів
                </div>
                <div className={styles.time}>
                    <a>{timeLeft.hours}</a>Годин
                </div>
                <div className={styles.time}>
                    <a>{timeLeft.minutes}</a>Хвилин
                </div>
            </div>
        </div>
    );
}

export default SaleTimer;
