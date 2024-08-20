import styles from './ItemVideo.module.css';
import InfiniteLooper from "../../elements/looper/InfiniteLooper";
import {useEffect, useRef, useState} from "react";

const ItemVideo = () => {
    const videos = [
        '/home/video/1707404036534631.mp4',
        '/home/video/1712324542232168.mp4'
    ];
    const [video, setVideo] = useState(videos[0]);
    const [index, setIndex] = useState(0);
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [video]);

    return (
        <div className={`centeredComponent column ${styles.videoContainer}`}>
            <InfiniteLooper speed='6' direction='left'>
                <p className={`${styles.loopingText} ${styles.loopingTextOdd}`}>Відеоогляд сумок</p>
                <p className={`${styles.loopingText} ${styles.loopingTextEven}`}>Відеоогляд сумок</p>
            </InfiniteLooper>
            <div className={styles.containerVideo}>
                <div className={styles.coveredVideo}>
                    <video ref={videoRef} className={styles.itemVideo}
                           muted={true}
                           autoPlay={true}
                           loop={true}
                           controls={true}>
                        <source src={videos[0]} type="video/mp4"/>
                    </video>
                </div>
                <div className={styles.coveredVideo}>
                    <video ref={videoRef} className={styles.itemVideo}
                           muted={true}
                           autoPlay={true}
                           loop={true}
                           controls={true}>
                        <source src={videos[1]} type="video/mp4"/>
                    </video>
                </div>
            </div>
        </div>
    )
}

export default ItemVideo