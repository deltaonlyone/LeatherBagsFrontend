import styles from './Home.module.css';
import ItemInfo from "./itemInfo/ItemInfo";


const Home = () => {

    return(
        <div className={styles['home']}>
            <ItemInfo></ItemInfo>
        </div>
    )
}

export default Home