import styles from './ItemInfoLines.module.css';

const ItemInfoLines = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.textWrap}>
                КУПУВАТИ У НАС КОМФОРТНО, БЕЗПЕЧНО ТА ВИГІДНО
            </div>
            <div className={styles.statsWrap}>
                <div className={styles.statItem}>
                    <div className={styles.numbs}>500+</div>
                    <div className={styles.secondaryText}>Задоволених покупців</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.numbs}>10+</div>
                    <div className={styles.secondaryText}>Років на ринку</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.numbs}>20+</div>
                    <div className={styles.secondaryText}>Досвічених фахівців</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.numbs}>40+</div>
                    <div className={styles.secondaryText}>Моделей</div>
                </div>
            </div>
        </div>
    );
}

export default ItemInfoLines;
