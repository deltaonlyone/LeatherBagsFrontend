import styles from './OrderInfo.module.css'

const OrderInfo = (props) => {
    return (
        <div className={styles.orderInfo}>
            <h4>{props.title}</h4>
            <div className={`row ${styles.descriptionContainer}`}>
                <img src={props.img} alt={props.img}/>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default OrderInfo