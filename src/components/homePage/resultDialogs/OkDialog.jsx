import styles from './ResultDialog.module.css';

const OkDialog = ({close}) => {
    return (
        <div className={styles.dialog}>
            <h3>Вітаємо</h3>
            <p><span>Ваше замовлення успішно оформлено.</span> <span>Очікуйте на дзвінок від менеджера.</span></p>
            <button onClick={close}>Ок</button>
        </div>
    )
}

export default OkDialog;