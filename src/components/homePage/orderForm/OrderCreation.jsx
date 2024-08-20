import styles from './OrderCreation.module.css'
import OrderInfo from "./OrderInfo";
import OrderForm from "./OrderForm";

const OrderCreation = ({setResult}) => {
    return (
        <div className={`centeredComponent not-draggable`}>
            <div className={`row ${styles.orderCreation}`}>
                <div className={`column ${styles.infoContainer}`}>
                    <div className={styles.infoElement}>
                        <OrderInfo title='Швидка доставка' img='home/delivery.svg'
                                   text='Оброблення замовлень протягом доби та відправлення Новою Поштою'>
                        </OrderInfo>
                    </div>

                    <div className={styles.infoElement}>
                    <OrderInfo title='Безпечна оплата' img='home/secure-payment.svg'
                               text='Ви оплачуєте замовлення при отримані. Надсилаємо замовлення на вашу адресу без передоплати'>
                    </OrderInfo>
                    </div>
                    <div className={styles.infoElement}>
                    <OrderInfo title='Гуртові замовлення' img='home/bulk-buying.svg'
                               text='З приводу гуртових замовлень та співробітництва звертайтесь за номером +380321312515'>
                    </OrderInfo>
                    </div>
                </div>
                <div className={`column ${styles.formContainer}`}>
                    <OrderForm setResult={setResult}></OrderForm>
                </div>
            </div>
        </div>
    )
}

export default OrderCreation
