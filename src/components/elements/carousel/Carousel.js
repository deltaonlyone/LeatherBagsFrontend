import {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Carousel.module.css';

const Carousel = ({images}) => {
    const [index, setIndex] = useState(0);
    const [xPosition, setXPosition] = useState(0);
    const [smallXPosition, setSmallXPosition] = useState(0);

    const mainWrapper = useRef();
    const mainWrapperWidth = useRef(0);
    const mainSliderWidth = useRef(0);

    const smallSlider = useRef();
    const smallSliderImages = useRef([]);
    const maxSmallOffset = useRef(0);
    const smallImageWidth = useRef(0);

    const calculateSliderSize = useCallback(() => {
        if (!smallSlider.current || !mainWrapper.current
            || smallSliderImages.current.length < 2) {
            return;
        }

        mainWrapperWidth.current = mainWrapper.current.getBoundingClientRect().right -
            mainWrapper.current.getBoundingClientRect().left;
        mainSliderWidth.current = mainWrapperWidth.current * images.length;

        const firstLeft = smallSliderImages.current[0].getBoundingClientRect().left;
        const secondLeft = smallSliderImages.current[1].getBoundingClientRect().left;
        const lastRight = smallSliderImages
            .current[smallSliderImages.current.length - 1]
            .getBoundingClientRect().right;

        smallImageWidth.current = secondLeft - firstLeft;
        let imagesWidth = lastRight - firstLeft;
        maxSmallOffset.current = smallSlider.current.offsetWidth - imagesWidth;
    }, []);

    const calculateSmallXPosition = useCallback((index) => {
        return Math.min(0, Math.max(
            -(index - 1) * smallImageWidth.current, maxSmallOffset.current));
    }, []);

    const setIndexAndPosition = (newIndex) => {
        setIndex(newIndex);
        setXPosition(newIndex * 100);
        setSmallXPosition(calculateSmallXPosition(newIndex));
    };

    useEffect(() => {
        calculateSliderSize();
        window.addEventListener('resize', () => {
            calculateSliderSize();
            setIndexAndPosition(index);
        });
    }, []);

    const handleClickPrev = (e) => {
        e.stopPropagation();
        if (index === 0) {
            setIndexAndPosition(images.length - 1);
        } else {
            setIndexAndPosition(index - 1);
        }
    };

    const handleClickNext = (e) => {
        e.stopPropagation();
        if (index === images.length - 1) {
            setIndexAndPosition(0);
        } else {
            setIndexAndPosition(index + 1);
        }
    };

    const mouseStart = useRef(0);
    const indexStart = useRef(0);
    const [dragged, setDragged] = useState(false);

    const lastUpdateTime = useRef(new Date());
    const throttleInterval = 100;

    const handleSliderDragStart = (e) => {
        e.stopPropagation();
        e.dataTransfer.setDragImage(new Image(), 0, 0);
        startDragging(e.clientX);
    };

    const handleSliderTouchStart = (e) => {
        startDragging(e.touches[0].clientX);
    };

    const handleSliderDrag = (e) => {
        dragPosX(e.clientX);
    };

    const handleSliderTouchMove = (e) => {
        dragPosX(e.changedTouches[0].clientX);
    };

    const handleSliderDragEnd = () => {
        stopDragging();
    };

    const handleSliderTouchEnd = () => {
        stopDragging();
    };

    const startDragging = (x) => {
        setDragged(true);
        mouseStart.current = x;
        indexStart.current = index;
    }

    const dragPosX = (x) => {
        const currentTime = new Date();
        if (currentTime - lastUpdateTime.current > throttleInterval) {
            setDraggingIndex(x);

            const dragX = indexStart.current + (mouseStart.current - x) / mainWrapperWidth.current;
            setXPosition(Math.max(0,
                Math.min(dragX, images.length - 1)) * 100);

            lastUpdateTime.current = currentTime;
        }
    };

    const setDraggingIndex = (x) => {
        const indexDiff = Math.round((mouseStart.current - x) / mainWrapperWidth.current);
        const index = Math.max(0, Math.min(
            indexStart.current + indexDiff, images.length - 1))

        setIndex(index);
        setSmallXPosition(calculateSmallXPosition(index));
    }

    const stopDragging = () => {
        setDragged(false);
        setIndexAndPosition(index);
    }

    return (
        <div className={'column not-draggable'}>
            <div className={`${styles.aspectRatioBox} ${styles.ratio120}`}>
                <div className={`${styles.mainWrapper} ${styles.coveredImage}`}
                     ref={mainWrapper} draggable='true'
                     onDragStart={handleSliderDragStart}
                     onDrag={handleSliderDrag}
                     onDragEnd={handleSliderDragEnd}
                     onTouchStart={handleSliderTouchStart}
                     onTouchMove={handleSliderTouchMove}
                     onTouchEnd={handleSliderTouchEnd}>
                    <div className={styles.mainSlider} style={{
                        transform: `translateX(${-xPosition}%)`,
                        transition: `transform ${dragged ? `${(throttleInterval / 1000).toFixed(2)}s linear`
                            : '0.6s ease-in-out'}`
                    }}>
                        {images.map((image, i) => (
                            <img draggable='false' src={image} alt={image} key={i}/>
                        ))}
                    </div>
                </div>
                <img className={`${styles.arrow} ${styles.arrowLeft}`}
                     src='/home/arrow.png' alt='arrow'
                     draggable='false'
                     onClick={handleClickPrev}/>
                <img className={`${styles.arrow} ${styles.arrowRight}`}
                     src='/home/arrow.png' alt='arrow'
                     draggable='false'
                     onClick={handleClickNext}/>
            </div>
            <div className={styles.smallWrapper}>
                <div className={styles.smallSlider} ref={smallSlider}
                     style={{
                         transform: `translateX(${smallXPosition}px)`
                     }}>
                    {images.map((image, i) => (
                        <div className={`${styles.cover} ${styles.coveredImage}`}
                             key={i} onClick={() => setIndexAndPosition(i)}
                             ref={(el) => (smallSliderImages.current[i] = el)}>
                            <img src={image} alt={image}/>
                            <div className={`${styles.blurImage} ${index === i ? '' : 'hidden'}`}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel