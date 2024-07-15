import styles from './OrderCreation.module.css'
import OrderInfo from "./OrderInfo";
import OrderForm from "./OrderForm";

const OrderCreation = () => {
    return (
        <div className={'centeredComponent'}>
            <div className={`row ${styles.orderCreation}`}>
                <div className={`column ${styles.infoContainer}`}>
                    <div className={styles.infoElement}>
                        <OrderInfo title='Швидка доставка' img='home/delivery.png'
                                   text='Оброблення замовлень протягом доби та відправлення Новою Поштою'>
                        </OrderInfo>
                    </div>

                    <div className={styles.infoElement}>
                    <OrderInfo title='Безпечна оплата' img='home/secure-payment.png'
                               text='Ви оплачуєте замовлення при отримані. Надсилаємо замовлення на вашу адрусу без передоплати'>
                    </OrderInfo>
                    </div>
                    <div className={styles.infoElement}>
                    <OrderInfo title='Гуртові замовлення' img='home/bulk-buying.png'
                               text='З приводу гуртових замовлень та співробітництва звертайтесь за номером +380321312515'>
                    </OrderInfo>
                    </div>
                </div>
                <div className={`column ${styles.formContainer}`}>
                    <OrderForm></OrderForm>
                </div>
            </div>
        </div>
    )
}

export default OrderCreation
