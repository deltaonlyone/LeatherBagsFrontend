import styles from './ItemVideo.module.css';
import InfiniteLooper from "./InfiniteLooper";

const ItemVideo = () => {

    return (
        <div className={`centeredComponent column ${styles.videoContainer}`}>
            <InfiniteLooper speed='6' direction='left'>
                <p className={`${styles.loopingText} ${styles.loopingTextOdd}`}>Відеоогляд сумок</p>
                <p className={`${styles.loopingText} ${styles.loopingTextEven}`}>Відеоогляд сумок</p>
            </InfiniteLooper>
            <video className={styles.itemVideo}
                   muted={true}
                   autoPlay={true}
                   loop={true}>
                <source src='/home/video.mp4' type="video/mp4"/>
            </video>
        </div>
    )
}

export default ItemVideo