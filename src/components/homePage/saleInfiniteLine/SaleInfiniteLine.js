import styles from './SaleInfiniteLine.module.css';
import InfiniteLoop from "../itemVideo/InfiniteLooper";

const SaleInfiniteLine = () => {
    return (
        <div className={styles.wrapper}>
            <InfiniteLoop speed='6' direction='left'>
                <p>Сьогодні діє знижка -35%</p>
            </InfiniteLoop>
        </div>
    );
}

export default SaleInfiniteLine;
