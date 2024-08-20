import styles from './ResultDialog.module.css';

const OkDialog = ({close}) => {
    return (
        <div className={styles.dialog}>
            <h3>Вітаємо</h3>
            <div className={styles.text}>
                <span>Ваше замовлення успішно оформлено.&nbsp;</span>
                <span>Очікуйте на дзвінок від менеджера.</span>
            </div>
            <button onClick={close}>Ок</button>
        </div>
    )
}

export default OkDialog;