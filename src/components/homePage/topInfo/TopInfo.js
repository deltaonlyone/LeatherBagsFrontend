import styles from './TopInfo.module.css';
import PhoneButton from "../../elements/phoneButton/PhoneButton";

const TopInfo = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.textWrap}>
                <a className={styles.mainText}>СУМОЧКИ БАНАНКИ <br/>З НАТУРАЛЬНОЇ ШКІРИ</a>
                <div className={styles.list}>
                    <li>100% натуральна шкіра</li>
                    <li>Швидка доставка</li>
                    <li>Оплата після отримання</li>
                    <li>Супер ціна</li>
                    <li>Можливий гурт</li>
                </div>

            </div>
            <div className={styles.imgWrap}>
                <img src={"bag2.webp"} alt="bag"/>
                <div className={styles.saleWrap}>
                    <div className={styles.circle}>-20%</div>
                </div>
            </div>
        </div>
    );
}

export default TopInfo;
