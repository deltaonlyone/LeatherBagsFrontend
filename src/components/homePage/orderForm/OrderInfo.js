import styles from './OrderInfo.module.css'

const OrderInfo = ({img, title, text}) => {
    return (
        <div className={styles.orderInfo}>
            <h4>{title}</h4>
            <div className={`row ${styles.descriptionContainer}`}>
                <img src={img} alt={img}/>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default OrderInfo