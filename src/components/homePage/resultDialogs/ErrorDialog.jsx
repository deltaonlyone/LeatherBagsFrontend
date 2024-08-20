import styles from './ResultDialog.module.css';

const ErrorDialog = ({close}) => {
    return (
        <div className={`${styles.dialog} ${styles.errorDialog}`}>
            <h3>Помилка</h3>
            <div className={styles.text}>
                <span>Вибачте.&nbsp;</span>
                <span>Сталася помилка.&nbsp;</span>
                <span>Ваше замовлення не було оформлене.&nbsp;</span>
                <span>Спробуйте ще раз.</span>
            </div>
            <button onClick={close}>Закрити</button>
        </div>
    )
}

export default ErrorDialog;