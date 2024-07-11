import styles from './Home.module.css';
import ItemInfo from "./itemInfo/ItemInfo";
import ItemVideo from "./itemVideo/ItemVideo";


const Home = () => {

    return(
        <div className={styles['home']}>
            <ItemInfo></ItemInfo>
            <ItemVideo></ItemVideo>
        </div>
    )
}

export default Home