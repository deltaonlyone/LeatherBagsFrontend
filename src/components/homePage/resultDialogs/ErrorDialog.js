import styles from './ResultDialog.module.css';

const ErrorDialog = ({close}) => {
    return (
        <div className={`${styles.dialog} ${styles.errorDialog}`}>
            <h3>Помилка</h3>
            <p>
                <span>Вибачте.</span> <span>Сталася помилка.</span> <span>Ваше замовлення не було оформлене.</span>
                <span>Спробуйте ще раз.</span>
            </p>
            <button onClick={close}>Закрити</button>
        </div>
    )
}

export default ErrorDialog;