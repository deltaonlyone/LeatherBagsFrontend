import styles from './SaleInfiniteLine.module.css';
import InfiniteLoop from "../looper/InfiniteLooper";

const SaleInfiniteLine = () => {
    return (
        <div className={styles.wrapper}>
            <InfiniteLoop speed='6' direction='left'>
                <p className={styles.text}>Сьогодні діє знижка -35%</p>
            </InfiniteLoop>
        </div>
    );
}

export default SaleInfiniteLine;
