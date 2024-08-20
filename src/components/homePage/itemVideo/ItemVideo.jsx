import styles from './ItemVideo.module.css';
import InfiniteLooper from "../../elements/looper/InfiniteLooper";
import {useEffect, useRef, useState} from "react";

const ItemVideo = () => {
    const videos = [
        '/home/video.mp4',
        '/home/video2.mp4',
        '/home/video.mp4'
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
            <div className={styles.coveredVideo}>
                <video ref={videoRef} className={styles.itemVideo}
                       muted={true}
                       autoPlay={true}
                       loop={true}>
                    <source src={video} type="video/mp4"/>
                </video>
                <img src='/home/arrow.png' alt="arrow"
                     className={`${styles.arrow} ${styles.arrowLeft}
                     ${index === 0 ? 'hidden' : ''}`}
                     onClick={() => {
                         if (index > 0) {
                             setVideo(videos[index - 1]);
                             setIndex(index - 1);
                         }
                     }}/>
                <img src='/home/arrow.png' alt="arrow"
                     className={`${styles.arrow} ${styles.arrowRight}
                     ${index === videos.length - 1 ? 'hidden' : ''}`}
                     onClick={() => {
                         if (index < videos.length - 1) {
                             setVideo(videos[index + 1]);
                             setIndex(index + 1);
                         }
                     }}/>
            </div>
        </div>
    )
}

export default ItemVideo