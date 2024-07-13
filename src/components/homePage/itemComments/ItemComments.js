import styles from './ItemComments.module.css';

const ItemComments = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.imgWrap}>
                <img src={"comments.png"} alt="bag"/>
            </div>
        </div>
    );
}

export default ItemComments;
