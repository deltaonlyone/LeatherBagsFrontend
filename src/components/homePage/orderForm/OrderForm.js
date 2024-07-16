import styles from './OrderForm.module.css'

const OrderForm = () => {

    return (
        <form className={`column ${styles.orderForm}`}>
            <h3>ЗРОБІТЬ ЗАМОВЛЕННЯ</h3>
            <h4>НАШ МЕНЕДЖЕР ЗВ'ЯЖЕТЬСЯ З ВАМИ</h4>
            <h5>Ваші персональні дані</h5>
            <div className={styles.formRow}>
                <div className={`${styles.inputColumn} ${styles.twoColumns}`}>
                    <input type='text' name='firstName' placeholder="Ім'я"/>
                    <input type='text' name='middleName' placeholder='По батькові'/>
                </div>
                <div className={`${styles.inputColumn} ${styles.twoColumns}`}>
                    <input type='text' name='lastName' placeholder='Прізвище'/>
                    <input type='tel' name='phoneNum' placeholder='+380000000000'/>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={`${styles.inputColumn} ${styles.twoColumns}`}>
                    <h5>Оберіть розмір</h5>
                    <fieldset>
                        <div className={styles.radioRow}>
                            <input type='radio' name='size' value='L' checked='true'/>
                            <label htmlFor='size'>Стандартний L</label>
                        </div>
                        <div className={styles.radioRow}>
                            <input type='radio' name='size' value='XL'/>
                            <label htmlFor='size'>Великий XL</label>
                        </div>
                    </fieldset>
                </div>
                <div className={`${styles.inputColumn} ${styles.twoColumns}`}>
                    <h5>Оберіть колір</h5>
                    <select>
                        <option value='Чорний'>Чорний</option>
                        <option value='Синій'>Синій</option>
                        <option value='Червоний'>Червоний</option>
                        <option value='Коричневий'>Коричневий</option>
                    </select>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={`${styles.inputColumn} ${styles.oneColumn}`}>
                    <h5>Деталі доставки</h5>
                    <input type='text' name='city' placeholder='Місто'/>
                    <input type='text' name='department' placeholder='Відділення нової пошти'/>
                </div>
            </div>
            <button type='submit'>Замовити</button>
        </form>
    )
}

export default OrderForm